import { SafeScreen } from "@/components/safeScreen";
import { UButton } from "@/components/uComponents/uButton";
import { UText } from "@/components/uComponents/uText";
import { educationList } from "@/data/education";
import { hs, ms, ws } from "@/utils/sizes";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { QuizOption } from "../components/quizOption";
import { bengaliDigits } from "@/utils";
import { router } from "expo-router";

export const Quiz = ({ id }: { id: number }) => {
  const { categoryTitle, quiz } = educationList[id];
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [isAnswered, setIsAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const onPressHandler = (index: number) => {
    if (!isAnswered) setSelectedOption(index);
  };

  const animateTransition = (direction, callback) => {
    translateX.value = withTiming(direction * 300, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(callback)();
      translateX.value = 300 * -direction;
      opacity.value = withTiming(1, { duration: 300 });
      translateX.value = withTiming(0, { duration: 300 });
    });
  };

  const onNextClickHandler = () => {
    if (count === SelectedQuiz.length - 1) {
      return router.replace(`/education/result/${id}`);
    }
    animateTransition(-1, () => {
      setCount((count) => count + 1);
      setSelectedOption(null);
      setIsAnswer(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  const SelectedQuiz = useMemo(() => {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {
      let randomNumber = Math.floor(Math.random() * quiz?.questions?.length);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  }, [id]);

  return (
    <SafeScreen styles={{ padding: ws(10) }}>
      <UText size="md" weight="600">{`এই কুইজ ${categoryTitle} সম্পর্কিত ${
        started
          ? `(${bengaliDigits[count + 1]}/${
              bengaliDigits[SelectedQuiz.length]
            })`
          : ""
      }`}</UText>

      {!started && (
        <View style={{ flex: 1 }}>
          <UText size="sm" align="justify" styles={{ marginTop: hs(5) }}>
            {quiz?.subtitle}
          </UText>
        </View>
      )}

      {!started && (
        <UButton onPress={() => setStarted(true)}>শুরু করুন</UButton>
      )}

      {started && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Animated.View style={[animatedStyle]}>
                <View>
                  <UText size="sm" weight="600">
                    {quiz?.questions[SelectedQuiz[count]].title}
                  </UText>
                </View>

                <View style={{ gap: 8, marginTop: hs(20) }}>
                  {quiz?.questions[SelectedQuiz[count]].options.map(
                    (option, index) => (
                      <QuizOption
                        key={index}
                        option={option}
                        isSelected={selectedOption === index}
                        index={index}
                        onPressHandler={onPressHandler}
                      />
                    )
                  )}
                </View>
              </Animated.View>
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: hs(20),
            }}
          >
            {!isAnswered && (
              <UButton
                size="md"
                onPress={() => {
                  setIsAnswer(true);
                  setSelectedAnswers((selectedAnswers) => {
                    selectedAnswers[count] = selectedOption;
                    return [...selectedAnswers];
                  });
                }}
                disabled={selectedOption === null}
              >
                যাচাই করুন
              </UButton>
            )}

            {isAnswered && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                {selectedAnswers[count] ===
                quiz?.questions[SelectedQuiz[count]].answer ? (
                  <View
                    style={{
                      backgroundColor: "#5abf85",
                      borderRadius: ms(5),
                      padding: ms(10),
                      marginBottom: hs(10),
                    }}
                  >
                    <UText size="lg" weight="700" styles={{ color: "white" }}>
                      চমৎকার 😊
                    </UText>
                    <UText size="sm" styles={{ color: "white" }}>
                      আপনার উত্তরটি সঠিক হয়েছে
                    </UText>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        backgroundColor: "#5a5858",
                        borderRadius: ms(5),
                        padding: ms(10),
                        marginBottom: hs(10),
                      }}
                    >
                      <UText size="lg" weight="700" styles={{ color: "white" }}>
                        দুঃখিত 😔
                      </UText>
                      <UText size="sm" styles={{ color: "white" }}>
                        আপনার উত্তরটি ভুল হয়েছে
                      </UText>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#5abf85",
                        borderRadius: ms(5),
                        padding: ms(10),
                        marginBottom: hs(10),
                      }}
                    >
                      <UText size="lg" weight="700" styles={{ color: "white" }}>
                        সঠিক উত্তর
                      </UText>
                      <UText size="sm" styles={{ color: "white" }}>
                        {
                          quiz?.questions[SelectedQuiz[count]].options[
                            quiz?.questions[SelectedQuiz[count]].answer
                          ]
                        }
                      </UText>
                    </View>
                  </View>
                )}

                <UButton
                  size="md"
                  onPress={onNextClickHandler}
                  // disabled={count === SelectedQuiz.length - 1}
                >
                  চালিয়ে যান
                </UButton>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeScreen>
  );
};
