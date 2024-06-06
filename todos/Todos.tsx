import {AddIcon, Box, HStack, Icon, Pressable, Text,} from "@gluestack-ui/themed"
import Button from 'components/Button';
import React, {useEffect, useState} from "react";
import shortid from "shortid";
import {
    ProgressBar,
    StyledGestureHandlerRootView,
    StyledKeyboardAvoidingView,
    StyledSafeAreaView,
    StyledScrollView,
    SwipeableContainer,
} from "./components";
import {defaultTodos, getCompletedTasks, getDay} from "./utils";
import strings from 'app/locales/Localization';
import { getLocales } from "expo-localization";

const Todos = () => {
    const [item, setItem] = useState("");
    const [todos, setTodos] = useState(defaultTodos);
    const [swipedItemId, setSwipedItemId] = useState(null);
    const [lastItemSelected, setLastItemSelected] = useState(false);

    const addTodo = () => {
        const lastTodo = todos[todos.length - 1];

        console.log(todos, "____");

        if (lastTodo.task !== "") {
            setTodos([
                ...todos,
                {
                    id: shortid.generate(),
                    task: "",
                    completed: false,
                },
            ]);
            setItem("");
            setLastItemSelected(false);
        }
    };

    const [currentLanguage, setCurrentLanguage] = useState(strings.getLanguage());

    const changeLanguage = async (lang: string) => {
        strings.setLanguage(lang);
        setCurrentLanguage(strings.getLanguage());
    };

    const loadLanguage = async () => {
        var lang = getLocales()[0].languageCode;
        if (lang) {
        strings.setLanguage(lang);
        setCurrentLanguage(strings.getLanguage());
        } else {
            lang = 'en';
        }
    };

    const switchLanguage = () => {
        if (currentLanguage == 'ja') {
            changeLanguage('en')
        } else {
            changeLanguage('ja')
        }
    }

    useEffect(() => {
        loadLanguage();
    }, []);
    

    return (

        <StyledKeyboardAvoidingView
            w="$full"
            h="$full"
            bg="$backgroundLDark900"
            behavior="padding"
            keyboardVerticalOffset={60}
        >
            <StyledSafeAreaView
                sx={{
                    "@base": {
                        bg: "$backgroundDark900",
                    },
                    "@md": {
                        bg: "$black",
                    },
                }}
                w="$full"
                h="$full"
            >
                <StyledGestureHandlerRootView
                    w="$full"
                    minHeight="$full"
                    sx={{
                        "@md": {
                            justifyContent: "center",
                            alignItems: "center",
                            bg: "$black",
                        },
                    }}
                >
                    <StyledScrollView
                        pt="$6"
                        pb="$10"
                        bg="$backgroundDark900"
                        sx={{
                            "@base": {
                                w: "$full",
                            },
                            "@md": {
                                w: 700,
                                maxHeight: 500,
                                borderRadius: "$sm",
                            },
                        }}
                        flexDirection="column"
                    >
                        <Box px="$6">
                            <Text color="$dark900" fontWeight="$bold" fontSize="$xl">
                                {getDay()}
                            </Text>
                            <ProgressBar
                                completedTasks={getCompletedTasks(
                                    todos,
                                    item != "" && lastItemSelected
                                )}
                                totalTasks={item !== "" ? todos.length + 1 : todos.length}
                            />
                        </Box>

                        {todos.map((todo, index) => (
                            <SwipeableContainer
                                key={index}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                                swipedItemId={swipedItemId}
                                setSwipedItemId={setSwipedItemId}
                            />
                        ))}

                        <Pressable
                            mb="$32"
                            px="$6"
                            sx={{
                                "@md": {
                                    mb: 0,
                                },
                            }}
                            onPress={() => {
                                addTodo();
                                // setTimeout(() => {
                                //     inputRef.current.focus();
                                // }, 100);
                            }}
                        >
                            <HStack alignItems="center" mt="$4">
                                <Icon as={AddIcon} w="$8" h="$8"/>
                                <Text ml="$2" fontSize="$sm" color="$textDark50">
                                    Add Task
                                </Text>
                            </HStack>
                        </Pressable>
                        <Text>{strings.formatString(strings.message, {name: "Peter"})}</Text>
                        <Button theme="primary" label={strings.changeLanguage} onPress={switchLanguage}/>

                    </StyledScrollView>
                </StyledGestureHandlerRootView>
            </StyledSafeAreaView>
        </StyledKeyboardAvoidingView>
    );
};

export default Todos;
