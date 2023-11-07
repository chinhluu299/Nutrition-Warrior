import React, { useState } from "react";
import { View, Text, TouchableOpacity, Touchable, TextInput } from "react-native";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SurveyScreen = () => {
    // const [surveys, setSurveys] = useState([]);

    const [step, setStep] = useState(0);
    const [choose, setChoose] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [inputValue, setInputValue] = useState(""); 
  
    const handleChange = (text) => { 
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, ""); 
        setInputValue(numericValue); 
    }; 
    const surveys = [
        {
            question: "What is your sex?",
            answer:[
                "Male",
                "Female"
            ]
        },
        {
            question: "What is your height?",
            answer:[
                ""
            ],
            unit: "kg"
        },
        {
            question: "What is your weight?",
            answer:[
                ""
            ],
            unit: "cm"
        },
        {
            question: "How often do you exercise?",
            answer:[
                "0 sessions/week",
                "1-3 sessions/week",
                "4-6 sessions/week",
                "7+ sessions/week"
            ]
        },
        {
            question: "How active are you?",
            answer:[
                "Mostly sedentary",
                "Moderately active",
                "Very Active",
            ]
        }
    ]
    const NextQuestionHandle = () => {
        if(step < surveys.length-1){
            setStep(step+1);
            setSelected(-1);
        }
            
    }
    const PreviousQuestionHandle = () => {
        if (step>0){
            setStep(step-1);
            setSelected(-1);
        }
    }
    const ChangeSelection = (index) => {
        setSelected(index);
        console.log(index);
        console.log(selected);
    }
    return (
        <View style={styles.container}>
            <View style={styles.questions}>
                {
                    surveys.map((value,index) => {
                        if(step == index){
                            return <View key={index} style={styles.step_active}></View>
                        }else{
                            return <View key={index} style={styles.step_nonactive}></View>
                        }
                    })
                }
            </View>
            <View style={styles.question_detail}>
                {
                    <View>
                        <Text style={styles.question_detail_question}>{surveys[step].question}</Text>
                        <View>
                            {surveys[step].answer.length> 1 ? surveys[step].answer.map((value,index)=>
                                <TouchableOpacity key={step +"_"+ index} style={selected == index ? styles.question_detail_choose_active :styles.question_detail_choose } onPress={()=> ChangeSelection(index)} >
                                    <Text>{value}</Text>
                                </TouchableOpacity>
                            ):
                            <TextInput
                                style={styles.question_detail_input} 
                                value={inputValue} 
                                onChangeText={handleChange} 
                                keyboardType="numeric"
                                placeholder={"Enter a number ( "+surveys[step].unit+" )"}
                            />}
                        </View>
                    </View>
                }
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.back_button} onPress={PreviousQuestionHandle}>
                    <MaterialCommunityIcons style={styles.back_button_icon} color={"#FFFFFF"} name="arrow-left"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.next_button} onPress={NextQuestionHandle}>
                    <Text style={styles.next_step}>Next</Text>
                    <MaterialCommunityIcons style={styles.back_button_icon} color={"#FFFFFF"} name="arrow-right"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SurveyScreen;