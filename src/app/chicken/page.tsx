'use client';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const  ChickenPage = () => {
    const [tempNameInput, setTempNameInput] = useState<string>('');
    const [tempQuestionInput, setTempQuestionInput] = useState<string>('');
    const [tempAnswerInput, setTempAnswerInput] = useState<string>('');

    const [inputCount, setInputCount] = useState<number>(0);
    
    const [playerCount, setPlayerCount] = useState<number>();

    const [questionMapping, setQuestionMapping] = useState<{[key: string]: string}>({});
    const [getQuestionMapping, setGetQuestionMapping] = useState<{[key: string]: string}>({});

    const [answerMapping, setAnswerMapping] = useState<{[key: string]: string}>({});
    const [getAnswerMapping, setGetAnswerMapping] = useState<{[key: string]: string}>({});

    const [stage, setStage] = useState<number>(0);
    const handlePlayerCountOk = () => {
        setStage(1)
    }

    const handleQuestionOk = () => {
        setInputCount((old) => old+1);
        setQuestionMapping({
            ...questionMapping,
            [tempNameInput]: tempQuestionInput
        })
        setTempNameInput('')
        setTempQuestionInput('')
    }

    const handleRandomQuestion = () => {
        // filter out key of tempName from questionMapping
        const newMap = Object.fromEntries(Object.entries(questionMapping).filter(([key]) => key.includes(tempNameInput)));
        // random from questionMapping
        const keys = Object.keys(newMap);
        const index = Math.floor(Math.random() * keys.length);
        const key = keys[index];
        setTempQuestionInput(newMap[key]);
    }
    const handleClickGetQuestionOK = () => {
        setInputCount((old) => old+1);

        setGetQuestionMapping({
            ...questionMapping,
            [tempNameInput]: tempQuestionInput
        })

        setGetAnswerMapping({
            ...questionMapping,
            [tempNameInput]: tempAnswerInput
        })
        setTempNameInput('')
        setTempQuestionInput('')
    }


    useEffect(()=> {
        if( inputCount === playerCount && playerCount != 0) {
            setStage((old) => old+1)
            setInputCount(0)
        }
    }, [inputCount, playerCount])
    switch(stage) {
        case 0:
            return (
                <div className=" p-16">
                    <div className="flex w-full justify-around">
                        <TextField 
                            label="人數"
                            variant="outlined"
                            value={playerCount} 
                            type="number"
                            onChange={(e)=>setPlayerCount(Number(e.target.value))} 
                        />
                        <Button variant="text" onClick={handlePlayerCountOk}>OK</Button>
                    </div>
                </div>
                )
        case 1:
            return (
                <div className=" p-16">
                    <div className="grid grid-cols-1 gap-4">
                        <h1>雞同鴨講有 {playerCount} 人玩緊</h1>
                        <TextField 
                            label="輸入你嘅名"
                            variant="outlined"
                            value={tempNameInput} 
                            onChange={(e)=>setTempNameInput(e.target.value)} 
                        />
                        <TextField 
                            label="輸入你嘅問題"
                            variant="outlined"
                            value={tempQuestionInput} 
                            onChange={(e)=>setTempQuestionInput(e.target.value)} 
                        />
                        <Button variant="text" onClick={handleQuestionOk}>OK</Button>
                    </div>
                </div>
            )
        case 2: 
            return (
                <div className="p-16">
                    <div className="grid grid-cols-1 gap-4">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">揀返你個名</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tempNameInput}
                                label="揀返你個名"
                                onChange={(e)=>setTempNameInput(e.target.value)}
                            >
                                {Object.keys(questionMapping).map((name) => (
                                    <MenuItem value={name} key={name}>{name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="text" onClick={handleRandomQuestion}>抽返個問題</Button>
                        {tempQuestionInput && 
                        <>
                            <div className="flex gap-2">
                            <h1>問題係 </h1>
                            <span>{tempQuestionInput}</span>
                            </div>

                            <TextField 
                                label="輸入你嘅答案"
                                variant="outlined"
                                value={tempAnswerInput} 
                                onChange={(e)=>setTempAnswerInput(e.target.value)} 
                            />
                            <Button variant="text" onClick={handleClickGetQuestionOK}>OK</Button>
                        </>
                        }
                    </div>
                </div>

            )
            case 3:
                return (
                    <div className=" p-16">
                        <div className="grid grid-cols-1 gap-4">
                            <h1>雞同鴨講有 {playerCount} 人玩緊</h1>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">揀返你個名</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tempNameInput}
                                    label="揀返你個名"
                                    onChange={(e)=>setTempNameInput(e.target.value)}
                                >
                                    {Object.keys(questionMapping).map((name) => (
                                        <MenuItem value={name} key={name}>{name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="text" onClick={handleQuestionOk}>OK</Button>
                        </div>
                    </div>
                )
        default:
            <></>
    }

}
export default ChickenPage;