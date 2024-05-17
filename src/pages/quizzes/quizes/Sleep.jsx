import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Checkbox, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import pollow from '../../../assets/images/photo_2024-03-04_02-00-39.jpg';
import sleepy from '../../../assets/images/photo_2024-03-04_02-00-59.jpg';
import AutoSleep from '../../../assets/images/photo_2024-03-04_02-00-56.jpg';
import Cycle from '../../../assets/images/photo_2024-03-04_02-00-53.jpg';
import ShutEye from '../../../assets/images/photo_2024-03-04_02-00-50.jpg';
import Watch from '../../../assets/images/photo_2024-03-04_02-00-43.jpg';




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


const GradeAnswer = ({ grade }) => {
    console.log(grade, "grade")

    const classes = useStyles();
    if (0 <= grade && grade <= 6) {
        return (
            <p className={classes.quizText}>وضعیت خواب شما مناسب و قابل قبول است.</p>
        )
    } else if (7 <= grade && grade <= 12) {
        return (
            <p className={classes.quizText}>در زمینه خواب نیاز به تقویت دارید و می توانید با به کارگیری روش های مراحل بعدی،به سطح مطلوب برسید.</p>
        )
    } else {
        return (
            <p className={classes.quizText}>وضعیت خواب شما مطلوب نیست و پیشنهاد می شود از راهنمایی های مراحل بعدی برای بهبود آن استفاده کنید.</p>
        )
    }

}

const Apps = () => {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant="body1" style={{
                fontSize: '1.2rem',
                textAlign: 'justify',
                fontWeight: 'bold',
                marginBottom: '1rem',
            }}>
                برای آنالیز خواب و بررسی اتفاقات در این بازه، نیاز به گوشی/ساعت هوشمند یا وسایل و تجهیزاتی خاص در این زمینه است.
                در صورت نیاز می‌توانید از نرم‌افزارهای زیر استفاده کنید. در نظر داشته باشید وسیله هوشمند در کل طول خواب باید در نزدیکی شما باشد.
            </Typography>
            <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column">
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0} textAlign="left">
                    <img src={pollow} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    Pillow: Sleep Traker
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0}>
                    <img src={sleepy} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    Sleepzy - Sleep Cycle Tracker
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0}>
                    <img src={AutoSleep} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    AutoSleep Track Sleep on Wath
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0}>
                    <img src={Cycle} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    Sleep Cycle - Sleep Traker
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0}>
                    <img src={ShutEye} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    ShutEye
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="95%" paddingX={0}>
                    <img src={Watch} style={{ width: 45, height: 45 }} alt="sleep cycle" className={classes.iconImage} />
                    Sleep Watch
                </Box>
            </Box>

        </Box>
    )
}



const Movement = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState(null);
    const [selected, setSelected] = useState([]);
    const [grade, setGrade] = useState(0);




    const questions = [
        {
            text: 'خواب، بخش حیاتی از زندگی انسان است که به طور مستقیم بر سلامتی جسم و روان او تاثیر می‌گذارد. به طور کلی، عموما افراد به ۷ تا ۸ ساعت خواب در شبانه‌روز نیاز دارند، اما این نیاز می‌تواند تحت تاثیر عوامل مختلفی مانند ژنتیک، سن و وضعیت سلامتی هر فرد متغیر باشد.\
\
            خواب کافی فواید بی‌شماری برای سلامتی انسان دارد. از جمله این فواید می‌توان به افزایش انرژی و شادابی، مدیریت استرس، تقویت حافظه و قدرت یادگیری، بهبود عملکرد سیستم قلبی و عروقی و تقویت سیستم ایمنی بدن اشاره کرد.\
            \
            در زمان خواب، هورمون‌های رشد در بدن ترشح می‌شوند که به تقویت عضلات و استخوان‌ها کمک می‌کنند. همچنین، خواب نقش مهمی در تثبیت خاطرات و پردازش اطلاعات دارد. به همین دلیل، کمبود خواب می‌تواند به اختلال در حافظه و تمرکز و همچنین افزایش احتمال ابتلا به اختلالات مختلف منجر شود.\
            \
            با توجه به اهمیت حیاتی خواب برای سلامتی، لازم است که افراد به کیفیت و کمیت خواب خود توجه ویژه‌ای داشته باشند.',
            options: [],
        },
        {
            text: '',
            options: [],
        },
        {
            text: 'برای درک بهتر وضعیت خواب خود، مشخص کنید که کدام یک از اختلالات زیر را دارد: (حداکثر انتخاب 3 گزینه ممکن است.)',
            options: ["بیدار شدن در نیمه شب", "زمان طولانی بین تصمیم به خواب و به خواب رفتن  ", "مشکلات تنفسی و خر و پف", "پایین بودن سطح انرژی در طول روز", "خستگی و خواب آلودگی زیاد هنگام بیدار شدن", "راه رفتن یا صحبت کردن در خواب", "افتادن از تخت", "رویاهای ناخوشایند"],
        },
        {
            text: 'برای داشتن درک بهتری از وضعیت ولنس شما عبارت‌ها و جملاتی طراحی شده‌اند که با پاسخ صحیح به آن‌ها، ما را در ارزیابی هرچه دقیق‌تر این بعد خود یاری خواهید کرد.\
\
            لطفا عبارت‌ها را به دقت مطالعه کرده و گزینه‌ای را که بیشتر در مورد شما صدق می‌کند انتخاب کنید:\
            .            ',
            options: [],
        },
        {
            text: 'در طول روز استرس و اضطراب زیادی تجربه می کنم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: ' قبل از خواب با استفاده از برنامه‌هایی مانند Soothing Sleep Sounds و از طریق گوش دادن به موسیقی آرامش‌بخش، می‌توان استرس قبل از خواب را مدیریت کرد..',
            options: [],
        },
        {
            text: 'قبل از خواب از نوشیدنی های حاوی کافئین مانند قهوه استفاده می کنم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'عمدتا نوشیدنی‌هایی مانند قهوه باعث اختلال در فرآیند خواب می‌شوند و مصرف آن ها 6 ساعت قبل از خواب پیشنهاد نمی‌شود.',
            options: [],
        },
        {
            text: 'نور محل خواب من زیاد است.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'میزان نور و روشنایی محل خواب از دیگر عوامل اثرگذار بر کیفییت خواب است. نور محیط مطلوب برای محل خواب کم تر از 150 لوکس است. برای اندازه گیری این پارامتر می توانید از نرم افزار Luxmeter استفاده کنید.',
            options: [],
        },
        {
            text: 'قبل از خواب با گوشی یا لپ تاپ کار می کنم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'پیشنهاد می شود حداقل 1 ساعت قبل از خواب با این وسایل کار نکنید تا خواب مطلوبتری را تجربه کنید.',
            options: [],
        },
        {
            text: 'مدتی قبل از خواب وعده غذایی اصلی و سنگین مصرف میکنم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'بهتر است وعده غذایی اصلی 3 ساعت قبل از خواب استفاده شود تا بدن فرصت کافی برای هضم غذا داشته باشد.',
            options: [],
        },
        {
            text: 'دمای محیط خواب من بیش از حد گرم یا سرد است.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'دمای مطلوب برای محیط خواب بین 16 تا 21 درجه سانتی گراد است.',
            options: [],
        },
        {
            text: 'بالشت و تشک خود را استاندارد و مناسب خوابی مطلوب  نمی‌بینم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'برای راهنمایی درباره وسایل خواب هوشمند و مناسب برای شما، با همکاران بخش پشتیبانی ارتباط برقرار کنید.',
            options: [],
        },
        {
            text: 'شغل من بیدار ماندن در شیفت شب را ایجاب می کند.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'برای این دسته افراد، مصرف کمی کافئین برای بالا بردن سطح انرژی در طول شب توصیه می شود. همچنین بهتر است افرادی با این شرایط کاری، توجه بیش تری نسبت به خواب خود و برنامه منظم تری برای خواب نسبت به افراد با شرایط معمولی داشته باشند.',
            options: [],
        },
        {
            text: 'قبل از خواب تحرک و فعالیت ورزشی شدید دارم.',
            options: ["به ندرت صدق می کند", "گاهی صدق می کند", "اغلب صدق می کند"],
        },
        {
            text: 'پیشنهاد می‌شود برای داشتن خوابی باکیفیت حداقل 1 ساعت قبل از خواب از انجام حرکات ورزشی سنگین خودداری کنید.',
            options: [],
        },
        {
            text: '',
            options: [],
        },
        {
            text: 'پیشنهاد می‌شود برای بهبود وضعیت خواب، هر شب قبل از خواب از این تکنیک تنفسی استفاده کنید.',
            options: [],
        },
        {
            text: '            به مدت 152 ثانیه از این تکنیک استفاده کنید. ابتدا برای 4 ثانیه دم (از بینی)، 7 ثانیه حبس کردن نفس و بعد برای 8 ثاتیه بازدم (از دهان) انجام شود. این کار برای 8 بار پی در پی تکرار شود.            ',
            options: [],
        },
        {
            text: 'علاوه بر تکنیک مرحله قبل، با استفاده از نرم افزارهایی مانند White Noise Deep Sleep Sounds و White Noise Lite و گوش دادن هر شبه به صداهای آرامشبخش هم می توانید مسیر بهبود خواب خود را هموارتر کنید. ',
            options: [],
        },
        {
            text: ' بعد از اولین شبی که از یکی از نرم‌افزارها یا تجهیزات مخصوص پایش خواب استفاده کردید، لطفا اسکرین‌شاتی از نتایج و خروجی آن‌ها تهیه کرده و در محل پشتیبانی آنلاین بارگذاری کنید. همکاران ما در اولین فرصت ممکن، با شما تماس خواهند گرفت.',
            options: [],
        },
        {
            text: 'با توجه به اینکه برای تحلیل فرآیند پیچیده ای مثل خواب احتیاج به گردآوری داده های بیشتری است، بعد از گذشت 5 روز، اسکرین شات مربوط به روزهای 2، 3، 4 و 5 را هم در محل تعیین شده بارگذاری کنید. ',
            options: [],
        },
        // Add more questions here
    ];



    const handleOptionChange = (event) => {
        if (event.target.checked) {
            if (selected.length < 3) {
                setSelected([...selected, event.target.name]);
            }
        } else {
            setSelected(selected.filter(item => item !== event.target.name));
        }
    };


    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
    };

    const handleNext = () => {
        if ((questions[currentQuestion].options.length !== 0 && selectedValue === null)) {
            if (currentQuestion === 2) {
                if (selected.length === 0) {
                    alert("حداقل یک گزینه را انتخاب کنید")
                } else {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedValue(null);
                    handleAnswer(selected);
                }
            }
        } else {
            let temp = 0;
            if (currentQuestion === 21) {
                for (let i = 4; i <= 20; i += 2) {
                    temp += parseInt(answers[i]);
                    console.log(temp)
                }
                setGrade(temp);
            }
            setCurrentQuestion(currentQuestion + 1);
            setSelectedValue(null);
            handleAnswer(selectedValue);

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
                        {(currentQuestion === 1) && (<Apps />)}
                        {(currentQuestion === 22) && (<GradeAnswer grade={grade} />)}
                        {(currentQuestion === 26 || currentQuestion == 27) && (<Button component={Link} to="/appointments" >مشاوره</Button>)}
                        <FormControl component="fieldset" style={{ width: "100%" }}>
                            <RadioGroup
                                value={selectedValue}
                                onChange={handleChange}
                                style={{ display: 'grid', justifyContent: 'center', listStyle: 'none', width: "100%" }}
                            >
                                {questions[currentQuestion].options.map((option, index) => (
                                    <>
                                        {(currentQuestion === 2) ? (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={selected.includes(option)}
                                                        onChange={handleOptionChange}
                                                        name={option}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ) : <FormControlLabel value={index} control={<Radio />} label={option} />}
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

                    <p style={{
                        fontSize: '1.2rem',
                        textAlign: 'justify',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                    }}>بعد از 5 روز استفاده از برنامه ها و تجهیزات و بارگذاری نتایج، برای راهنمایی و کسب اطلاعات دقیق تر در مورد وضعیت خواب خود با قسمت پشتیبانی در ارتباط باشید.
                    </p>
                    <Button component={Link} to="/quizzes" type='button' variant='contained' style={{ margin: "20px auto 80px" }}>بازگشت</Button>
                </div>
            )}
        </div >
    );
};

export default Movement;

