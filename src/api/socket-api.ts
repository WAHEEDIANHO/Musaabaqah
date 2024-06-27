import {Server, Socket} from "socket.io";
import {EVENT, IQuestion} from "../utils/app-errors";
import axios from "axios";


interface IGeneratedQuestion {
    juz: number,
    chapter: number,
    verse: number,
    page: number,
    preview?: any[]
}

interface IEventArgs {
    room: string,
    message?: any,
}
export = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(socket.id, "connected successfully");

        socket.on(EVENT.JOIN, (args) => {
            console.log(args)
            socket.join(args.room);
            console.log(io.in(args.room).allSockets())
        })

        socket.on(EVENT.GENERATE_QUESTION, async (args: IQuestion) => {
            /***
             * Get competition detail and note the number of question needed
             * Generate random questions within the participant Juzz capacity
             * Broadcast the question to the channel (made up of only judges)
             ***/
            try{
                const { data: {juzs }}: { data : { juzs: any[] } } = await axios.get("https://api.quran.com/api/v4/juzs");
                // console.log(juzs.length)

                //     Generating question
                let start = args.start-1;
                const end = args.end-1
                const no_of_question = args.questionNo as number;
                const questGroup: number = Math.ceil(((end - start) + 1)/no_of_question);
                const questions: IGeneratedQuestion[] = [];


                const randomNUmber = (min: number, max: number): number => Math.floor(Math.random() * ((max+1) - min) + min);
                const questionGenerator =  (start: number, end: number, range_end: number): void => {
                    const juz = randomNUmber(start, end); // (0-29)
                    const chapter_in_juz = Object.keys(juzs[juzs.findIndex((x: any)  => x.juz_number == juz+1)]["verse_mapping"]);
                    const last_chapter = chapter_in_juz[chapter_in_juz.length-1];
                    const steps = Math.floor(Number(juzs[juz]["verses_count"])/no_of_question)


                    const chapter = chapter_in_juz[randomNUmber(0, chapter_in_juz.length-1)]; // (1-114)
                    if((juz===0 && chapter=="1") || (juz==29 && Number(chapter) > 100)) return questionGenerator(start, end, range_end)
                    const x = Number(juzs[juzs.findIndex((x: any)  => x.juz_number == juz+1)]["verse_mapping"][chapter].split("-")[0]) as number;
                    const y = Number(juzs[juzs.findIndex((x: any)  => x.juz_number == juz+1)]["verse_mapping"][chapter].split("-")[1]) as number;
                    const verse_select = randomNUmber(x, y);

                    // check here if verse selected is not exact surah that mark the end of the surah that end the juz
                    // very critical
                    // for a single juz that hold only one surah, ensuring some kind gap between those question

                    if( juz === range_end ) {
                      if (chapter === last_chapter && (y-verse_select) < 10)  return questionGenerator(start, end, range_end);

                     const prev_quest_from_chapter = questions.filter((question: IGeneratedQuestion) => question.chapter === Number(chapter));
                     console.log(prev_quest_from_chapter)
                     if(prev_quest_from_chapter.length > 0 && questions.length < no_of_question){
                          for(const question of prev_quest_from_chapter){
                              console.log("here")
                              console.log(Math.abs(verse_select - question.verse) < 20)
                              if(Math.abs(verse_select - question.verse) < steps-5) {
                                  console.log("Enter here");
                                  return questionGenerator(start, end, range_end);
                              };
                          }
                      }
                    }

                    questions.push({
                        juz, // 0-29
                        chapter: Number(chapter), // normal number start from 1
                        verse: verse_select, // normal number start from 1
                        page: 0
                    })
                }


                if((end - start)+1 < no_of_question) {
                    for(let i=0; i<no_of_question; i++) questionGenerator(start, end, end);
                }else {
                    for(start; start<=end; start+=questGroup) {
                        if(start+questGroup > end) {
                            questionGenerator(start, end, end)
                            break
                        }
                        questionGenerator(start, start+questGroup-1, end)
                    }
                }


                for (const [posEl, { juz, chapter,verse }] of Object.entries(questions)) {
                    // Questions object
                    const { data: { verses } } = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?juz_number=${juz+1}`);
                    const { data: { verse: { page_number } } } = await axios.get(`https://api.quran.com/api/v4/verses/by_key/${chapter}:${verse}`);
                    const pos = verses.findIndex((el: any) => el.verse_key == `${chapter}:${verse}`);
                    console.log("verses", verses.length, juz+1, chapter, verse, pos);
                    questions[Number(posEl)].preview = verses.slice(pos, pos + 5);
                    questions[Number(posEl)].page = page_number;
                }
                questions.sort((a: IGeneratedQuestion, b: IGeneratedQuestion) => {
                    if(a?.page > b?.page  ){
                        return 1
                    }else if(a.page == b.page){
                        if(a.chapter > b.chapter){
                            return 1
                        }else if (a.chapter == b.chapter){
                            if(a.verse > b.verse) return 1
                            else return -1
                        }else return -1
                    }else {
                        return -1
                    }
                })
                console.log("log question", questions);

                io.to(args.room).emit(EVENT.GENERATE_QUESTION, {message: questions})
            }catch (e: any) {
                console.log(e)
                io.to(args.room).to(socket.id).emit(EVENT.ERROR, {msg: "Error occur while participant generate question"});
            }
        })

        socket.on(EVENT.JUZ_RANGE_SELECTION, (args: IEventArgs) => {
            io.to(args.room).emit(EVENT.JUZ_RANGE_SELECTION, args.message);
        })

        socket.on(EVENT.DONE, (args: IEventArgs)=> {
            console.log(args.room)
            io.to(args.room).emit("DONE");
        })
        socket.on("disconnect", ()=> {
            console.log(socket.id, "disconnect")
        })
    });

}
