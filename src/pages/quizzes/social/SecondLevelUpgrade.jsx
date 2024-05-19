import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Input, Button, Typography } from '@mui/material';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import Fitness from '../../../assets/images/photo_2024-03-04_19-44-32.jpg';
import Health from '../../../assets/images/photo_2024-03-04_19-44-28.jpg';
import Mi from '../../../assets/images/photo_2024-03-04_19-44-34.jpg';



const useStyles = makeStyles({
    container: {
        padding: '2rem',
        height: '90%',
    },
    iconImage: {
        width: '75px',
        margin: '0.5rem',
    },
    gradientLine: {
        height: '1px',
        width: '100%',
        border: "none",
        background: 'linear-gradient(to right, transparent, black, transparent)',
    },
    walkInput: {
        margin: "0 auto",
        width: 100
    },
    progressBar: {
        width: '100%',
        height: '.5rem',
    },
    textWrapper: {
        overflow: 'auto',
        margin: '3rem 0',
    },
    quizText: {
        fontSize: '1.2rem',
        textAlign: 'justify',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    option: {
        width: '100%',
        maxWidth: '300px',
        margin: '0.2rem auto',
        padding: '0.5rem',
        border: '2px solid #2d93ad',
        backgroundColor: 'transparent',
    },
    buttonWrapepr: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "row-reverse"
    },
    button: {
        backgroundColor: 'transparent',
        padding: '0.5rem',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
    },
});

const StepResults = ({ steps, age }) => {
    const classes = useStyles();
    console.log(steps, "steps", age, "age")
    if (steps < 5000) {
        return (
            <p className={classes.quizText}>نتایج نشان می‌دهد که شما در حال حاضر جزو افراد با تحرک پایین هستید. با افزایش تحرک و فعالیت بدنی، می‌توانید بروز اختلالات مختلف سلامتی را کنترل کنید.</p>
        );
    } else {
        if (age === '4' || age === '5' || age === '6') {
            if (steps >= 5000 && steps <= 6000) {
                return (
                    <p className={classes.quizText}>بررسی‌ها نشان می‌دهد که میزان فعالیت شما در حال حاضر از حد ایده‌آل پایین‌تر است. پیشنهاد ما این است که در صورت امکان، زمان بیشتری را به پیاده‌روی اختصاص دهید.
                    </p>
                )
            } else {
                return (
                    <p className={classes.quizText}>فعالیت پیاده‌روی شما در سطح مطلوبی قرار دارد. </p>
                )
            }
        } else {

            if (steps >= 5000 && steps <= 8000) {
                return (
                    <p className={classes.quizText}>بررسی‌ها نشان می‌دهد که میزان فعالیت شما در حال حاضر از حد ایده‌آل پایین‌تر است. پیشنهاد ما این است که در صورت امکان، زمان بیشتری را به پیاده‌روی اختصاص دهید.
                    </p>
                )
            } else {
                return (
                    <p className={classes.quizText}>فعالیت پیاده‌روی شما در سطح مطلوبی قرار دارد. </p>
                )
            }
        }
    }


}

const SecondLevelUpgrade = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState(null);
    const [walkMinutes, setWalkminuts] = useState(null);
    const [steps, setsteps] = useState(0);




    const questions = [
        {
            text: '',
            options: [],
        },
        {
            text: '',
            options: [],
        },
        {
            text: '',
            options: [],
        },
        {
            text: '۱. در شروع گفتگو با دیگران احساس راحتی و اطمینان می‌کنم.',
            options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
        },
        {
            text: '۲. در موقعیت‌های اجتماعی می‌توانم افکار و احساساتم را به وضوح و صادقانه بیان کنم.',
            options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
        },
        {
          text: '۳. من می‌توانم مرزهای سالم را در روابطم حفظ کنم و در صورت لزوم «نه» بگویم.',
          options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
      },
      {
        text: '۴.احساس تعلق و ارتباط با خانواده و/یا دوستانم دارم.',
        options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
    },
    {
      text: '۵. من به طور فعال در فعالیت‌های اجتماعی و رویدادهایی که از آنها لذت می‌برم شرکت می‌کنم.',
      options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '۶. قادر به حل تعارضات با دیگران به شیوه‌ای محترمانه و سازنده هستم.',
    options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '۷. احساس مسئولیت می‌کنم که به طور مفیدی به جامعه خود کمک کنم.',
    options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '۸. . من قادر به حفظ روابط سالم و حمایتی علی‌رغم اختلافات گاه و بیگاه هستم.',
    options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '۹. من می‌توانم دیگران را ببخشم و از رنج‌های گذشته خود عبور کنم.',
    options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '۱۰. من می‌توانم به خودم بخندم و خیلی چیزها را به خودم نگیرم.',
    options: ["۱- اغلب صدق می‌کند","۲- گاهی/بعضی اوقات صدق می‌کند","۳- به ندرت صدق می‌کند"],
  },
  {
    text: '',
    options: [],
  },
        // Add more questions here
    ];

    const handleWalk = e => {
        setWalkminuts(e.target.value);
        let walkPersecond = e.target.value / 60;
        console.log(walkPersecond, "walkPersecond")
        console.log(answers[1])
        switch (answers[1]) {
            case '0':
                setsteps(walkPersecond * 3.02 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '1':
                setsteps(walkPersecond * 3.1 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '2':
                setsteps(walkPersecond * 3.15 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '3':
                setsteps(walkPersecond * 3.05 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '4':
                setsteps(walkPersecond * 2.9 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '5':
                setsteps(walkPersecond * 2.65 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            case '6':
                setsteps(walkPersecond * 2.13 * 2000)
                console.log(walkPersecond * 3.02 * 2000)
                break;
            default:
                setsteps(walkPersecond * 3.05 * 2000)
        }
    };

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
    };

    const handleNext = () => {

        if (questions[currentQuestion].options.length !== 0 && selectedValue === null) { } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedValue(null);
            handleAnswer(selectedValue);
            console.log(answers);
        }

    };

    const handlePrev = () => {
        setCurrentQuestion(currentQuestion - 1);
    };
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className={classes.container}>
            <progress className={classes.progressBar} value={currentQuestion} max={questions.length}></progress>
            {currentQuestion < questions.length ? (
                <Box display="flex" flexDirection="column" height="90%" justifyContent="space-between" >
                    <div className={classes.textWrapper}>
                        <p className={classes.quizText}>{questions[currentQuestion].text}</p>
                        {(currentQuestion === 0) && (
                            <>
                            <p>ولنس اجتماعی را می‌توان به عنوان سلامت روابط ما درک کرد، از جمله کیفیت آن روابط و توانایی ما برای احساس ارتباط، حمایت و بخشی از یک جامعه. این شامل مهارت‌های ما در تعامل و برقراری ارتباط با دیگران و همچنین توانایی ما برای ایجاد ارتباطات معنادار است.

این جنبه از ولنس بسیار مهم است. ما به عنوان موجودات اجتماعی از تعاملات اجتماعی سازنده و داشتن یک سیستم حمایتی قوی سود زیادی می‌بریم. این ارتباطات حتی می‌تواند تأثیر خوشایندی بر سلامت جسمی و روانی ما داشته باشد.</p>
                            </>
                        )}
                        {(currentQuestion === 1) && (
                          <p>انسان‌ها موجوداتی اجتماعی هستند که به یکدیگر احتیاج دارند.
                          سیستم لیمبیک مغز وظیفه ایجاد تمایل در انسان به منظور برقراری ارتباط با خود و سایر افراد را دارد.
                          در نتیجه این تمایل، در صورت ایجاد، گسترش و نگهداری روابط مطلوب، انسان‌ها توانایی تطبیق با موقعیت‌های سخت اجتماعی را پیدا می‌کنند که به دنبال آن، حس امنیت، رضایت و آرامش به وجود می‌آید.
                          در مجموع افرادی با توانایی ارتباطی قوی (قطعا به شخصیت فرد و درون/برون‌گرا بودن وابسته است) واکنش‌های بهتری در مواجهه با اضطراب دارند که نتیجه آن داشتن دید بهتری به زندگی و رضایت از سبک زندگیشان خواهد بود.</p>
                        )}
                        {(currentQuestion === 2) && (
                            <p>برای داشتن درک بهتری از وضعیت ولنس اجتماعی شما عبارت‌ها و جملاتی طراحی شده‌اند که با پاسخ صحیح به آن‌ها، ما را در ارزیابی هرچه دقیق‌تر این بعد خود یاری خواهید کرد.

                            لطفا عبارت‌ها را به دقت مطالعه کرده و گزینه‌ای را که بیشتر در مورد شما صدق می‌کند انتخاب کنید:</p>
                        )}
                        {(currentQuestion === 3) && (
                           <>
                           </>
                        )}
                        {(currentQuestion === 4) && (
                           <>
                           </>
                        )}

                        <FormControl component="fieldset" style={{ width: "100%" }}>
                            <RadioGroup
                                value={selectedValue}
                                onChange={handleChange}
                                style={{ display: 'grid', justifyContent: 'center', listStyle: 'none', width: "100%" }}
                            >
                                {questions[currentQuestion].options.map((option, index) => (
                                    <>
                                        <FormControlLabel value={index} control={<Radio />} label={option} />
                                        <hr className={classes.gradientLine} />
                                    </>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={classes.buttonWrapepr}>
                        <button className={classes.button} onClick={handleNext}
                            style={currentQuestion > 0 ? { borderRadius: '10px 0px 0px 10px', } : { borderRadius: '10px 10px 10px 10px', }}
                        >مرحله بعد
                            <ArrowBack style={{ position: "relative", top: 8 }} />
                        </button>
                        {currentQuestion > 0 && <button className={classes.button} style={{
                            borderRadius: '0px 10px 10px 0px',
                        }} onClick={handlePrev}>
                            <ArrowForward style={{ position: "relative", top: 8 }} />
                            مرحله قبل</button>}

                    </div>
                </Box >
            ) : (
                <div>

                    <p>
                        در صورت دسترسی داشتن به ساعت/گوشی هوشمند با استفاده از یکی از نرم افزارهای زیر می‌توانید اطلاعات دقیق‌تری از وضعیت تحرک خود داشته باشید.
                    </p>
                    <Box display="flex" alignItems="center" width="100%" justifyContent="space-between" marginY={2}>
                        <img src={Fitness} alt="app" style={{ width: 60, height: 60 }} />
                        <Typography variant='body1'>Fitness (برای آیفون)</Typography>

                    </Box>
                    <Box display="flex" alignItems="center" width="100%" justifyContent="space-between" marginY={2}>
                        <img src={Health} alt="app" style={{ width: 60, height: 60 }} />
                        <Typography variant='body1'>Samsung Health (برای سامسونگ)</Typography>

                    </Box>
                    <Box display="flex" alignItems="center" width="100%" justifyContent="space-between" marginY={2}>
                        <img src={Mi} alt="app" style={{ width: 60, height: 60 }} />
                        <Typography variant='body1'>Mi Fitness (برای شیائومی)</Typography>
                    </Box>

                    <Button component={Link} to="/quizzes" type='button' variant='contained' style={{ margin: "20px auto 80px" }}>بازگشت</Button>
                </div>
            )}
        </div >
    );
};

export default SecondLevelUpgrade;













