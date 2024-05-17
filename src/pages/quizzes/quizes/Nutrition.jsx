import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, Input, Button } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import ArrowForward from '@material-ui/icons/ArrowForward';



const useStyles = makeStyles({
    container: {
        padding: '2rem',
        height: '90%',
    },
    accordion: {

    },
    gradientLine: {
        height: '1px',
        width: '100%',
        border: "none",
        background: 'linear-gradient(to right, transparent, black, transparent)',
    },
    table: {
        width: "100%",
        backgroundColor: "#d4ebff88",
        borderRadius: "10px",
        marginBottom: "1rem",
    },
    tableHead: {
        backgroundColor: "#d4ebff",
        textAlign: "center",
    },
    tableRow: {
        textAlign: "center"
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

const Nutrition = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState(null);

    const [table1Rows, setTable1Rows] = useState([]);
    const [table2Rows, setTable2Rows] = useState([]);
    const [table3Rows, setTable3Rows] = useState([]);
    const [table4Rows, setTable4Rows] = useState([]);
    const [table5Rows, setTable5Rows] = useState([]);
    const [detailsInput, setDetailsInput] = useState([
        { time: '', food: '', calories: '' },
        { time: '', food: '', calories: '' },
        { time: '', food: '', calories: '' },
        { time: '', food: '', calories: '' },
        { time: '', food: '', calories: '' },
    ]);

    const handleAddRow1 = () => {
        const newRow = {
            time: detailsInput[0].time,
            food: detailsInput[0].food,
            calories: detailsInput[0].calories,
        };

        setTable1Rows([...table1Rows, newRow]);
        setDetailsInput([
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
        ]);
    };

    const handleAddRow2 = () => {
        const newRow = {
            time: detailsInput[1].time,
            food: detailsInput[1].food,
            calories: detailsInput[1].calories,
        };

        setTable2Rows([...table2Rows, newRow]);
        setDetailsInput([
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
        ]);
    }

    const handleAddRow3 = () => {
        const newRow = {
            time: detailsInput[2].time,
            food: detailsInput[2].food,
            calories: detailsInput[2].calories,
        };

        setTable3Rows([...table3Rows, newRow]);
        setDetailsInput([
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
        ]);
    }

    const handleAddRow4 = () => {
        const newRow = {
            time: detailsInput[3].time,
            food: detailsInput[3].food,
            calories: detailsInput[3].calories,
        };

        setTable4Rows([...table4Rows, newRow]);
        setDetailsInput([
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
        ]);
    }

    const handleAddRow5 = () => {
        const newRow = {
            time: detailsInput[4].time,
            food: detailsInput[4].food,
            calories: detailsInput[4].calories,
        };

        setTable5Rows([...table5Rows, newRow]);
        setDetailsInput([
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
            { time: '', food: '', calories: '' },
        ]);
    }

    const questions = [
        {
            text: 'انتخاب یک سبک غذایی سالم، نقشی اساسی در ولنس فیزیکی، روحی و احساسی ما دارد. در حالی که ورزش برای حفظ تناسب اندام ضروری است، به تنهایی کافی نیست. تغذیه مناسب فواید بی‌شماری دارد، از جمله:\
\
            - کاهش خطر ابتلا به اختلالات: تغذیه سالم خطر ابتلا به اختلالات قلبی، افسردگی، دیابت و بسیاری از اختلالات دیگر را کاهش می‌دهد.\
            - افزایش طول عمر: مطالعات نشان داده‌اند که افراد با سبک غذایی سالم، عمر طولانی‌تری دارند.\
            - سلامت پوست و مو: تغذیه مناسب به سلامت پوست و مو کمک می‌کند و در کاهش پیری زودرس موثر است.\
            - افزایش قدرت و تناسب اندام: تغذیه سالم عضلات را تقویت می‌کند و به تناسب اندام کمک می‌کند.\
            - بهبود عملکرد مغز: تغذیه مناسب به بهبود حافظه، تمرکز و قدرت یادگیری کمک می‌کند.\
            - سلامت زنان باردار و شیرده: تغذیه مناسب برای زنان باردار و شیرده ضروری است تا سلامت خود و جنین یا نوزادشان را تضمین کنند.\
            - بهبود عملکرد دستگاه گوارش: تغذیه سالم به هضم بهتر غذا و سلامت دستگاه گوارش کمک می‌کند.\
            \
            برای دریافت تمام مواد مغذی مورد نیاز بدن، ضروری است که از تنوع غذایی در سبک غذایی خود استفاده کنیم. مصرف میوه‌ها، سبزیجات، لبنیات، غلات، حبوبات و گوشت و فرآورده‌های آن به تناسب به تامین نیازهای بدن کمک می‌کند. ',
            options: [],
        },
        {
            text: 'لطفا قسمت زیر را تا حد امکان کامل کنید و  تا جایی که به خاطر دارید مواد غذایی مصرفی و مقدار آن ها را وارد کنید. برای این منظور، هم به وعده‌های غذایی اصلی، هم به میان وعده‌ها و هم به نوشیدنی‌ها توجه کنید.\
\
            توجه: در طول این 5 روز، هر زمان که احساس گرسنگی یا تشنگی به شما دست داد، مطابق میل خود و مانند روزهای گذشته از مواد غذایی و نوشیدنی استفاده کنید. در این مرحله نیازی به استفاده از هیچ سبک غذایی نیست و این روش دید بهتری از عادات غذایی شما را نمایش می‌دهد. اگر برای ساعات زیاد یا حتی 1 روز میل به غذا نداشتید، احتیاجی به خوردن چیزی نیست. \
            \
            بعد از تکمیل این قسمت برای 5 روز، با قسمت پشتیبانی تماس برقرار کنید.',
            options: [],
        },
        {
            text: 'به منظور درک جامع‌تری از وضعیت بدنی- ذهنی خود به 10 سوالی که در ادامه آورده شده‌اند پاسخ دهید. این اطلاعات در مورد یافتن تعادل در بدن شما کمک‌کننده خواهند بود.',
            options: [],
        },
        {
            text: '',
            options: [],
        },
        {
            text: 'فقط 1 گزینه که برای اکثر طول عمر شما (نه لزما شرایط فعلیتان) صادق است را انتخاب کند.',
            options: [],
        },
        {
            text: 'سوال 1: وضعیت و حالت بدنی خود را چگونه توصیف می کنید؟',
            options: ['باریک و کشیده', 'متوسط و دارای مقداری عضله', 'تنومند '],
        },
        {
            text: 'سوال 2: تغییرات وزن شما چگونه بوده است؟',
            options: ['افزایش وزن سخت', 'افزایش و کاهش وزن راحت', 'کاهش وزن سخت'],
        },
        {
            text: 'سوال 3: دمای بدن شما معمولا چگونه است؟',
            options: ['سرد و ترجیح به حضور در محیط گرم', 'گرم و ترجیح به حضور در محیط سرد', 'متعادل و قابل تطبیق با اکثر محیط ها'],
        },
        {
            text: 'سوال 4: اشتهای شما چگونه است؟',
            options: ['یکسان نیست و امکان از دست دادن وعده های غذایی وجود دارد', 'زیاد است و گرسنگی زیاد ممکن است باعث تغییر خلق شود', 'مناسب است و مدتی بعد از غذا احساس گرسنگی یا سنگینی وجود ندارد'],
        },
        {
            text: 'سوال 5: وضعیت انرژی شما چگونه است؟',
            options: ['شروع روز با انرژی زیاد و سپس کاهش آن', 'متوسط و با قابلیت ادامه دادن فعالیت ها در صورت نیاز', 'دارای تحمل زیاد و تجربه کم در کاهش انرژی'],
        },
        {
            text: 'سوال 6: وضعیت خواب خود را چگونه توصیف می کنید؟',
            options: ['خواب سبک', 'خواب کم در مقایسه با سایرین', 'خواب عمیق و طولانی'],
        },
        {
            text: 'سوال 7: کارهای روزمره خود را چگونه انجام می دهید؟',
            options: ['دارای روتین و انجام کارها با برنامه ریزی قبلی', 'تلاش حداکثری برای رسیدن به اهداف و داشتن  روزی مفید', 'با انعطاف و بدون برنامه ریزی زیاد'],
        },
        {
            text: 'سوال 8: نحوه تصمیم گیریتان چطور است؟',
            options: ['کند و گاهی همراه با دخالت دیگران', 'کاملا دقیق و پس از بررسی کامل', 'در لحظه و با توجه به حس آن لحظه'],
        },
        {
            text: 'سوال 9: غریزه و ذات خود را چگونه ارزیابی می کنید؟',
            options: ['با ذوق و میل به کسب تجارب جدید', 'با هدف و کاملا نتیجه محور', 'بدون سخت گیری و سوار بر جریان زندگی'],
        },
        {
            text: 'سوال 10: در مواجهه با استرس، چه رفتاری از خود نشان می دهید؟',
            options: ['مضطرب و نگران', 'غیرمنطقی و بدون صبر', 'بدون انگیزه و رها کردن مسائل'],
        },
        {
            text: 'با توجه به نتایج این سوالات، موارد زیر مشخص می شوند: \
\
            قدرت ذهنی، وضعیت جسمانی، وضعیت پوست، وضعیت مو، وضعیت اشتها، وضعیت برنامه ریزی، وضعیت خلقی، نحوه مکالمه و تعامل با سایرین، میل به خرید، توانایی تحمل اضطراب            (تحلیل این بخش در آینده ارائه خواهد شد) ',
            options: [],
        },
        {
            text: 'در مراحل بعدی تعدادی از سبکهای غذایی مرسوم آورده شده اند. آشنایی بیش تر با مزایا، معایب و نکات مهم درباره آن ها می تواند نقش مهمی در اصلاح سبک تغذیه شما داشته باشد. در صورتیکه هم اکنون از یکی از آن ها استفاده می کنید، مطالعه مطالب آتی، ضروری تر به نظر می رسد. بعد از مطالعه هر قسمت، انتخاب کنید هر سبک غذایی حدودا به چه میزان مورد علاقه شماست؟ همچنین ذکر کنید هر سبک غذایی تقریبا به چه میزان توسط شما استفاده میشود.',
            options: [],
        },
        {
            text: 'سبک غذایی Omnivore:  \
            این سبک غذایی که متداول ترین بین انسان هاست، شامل استفاده از مواد غذایی با منشا حیوانی و گیاهی است به دلیل استفاده توامان از منابع حیوانی و گیاهی، تمام مواد غذایی مورد نیاز بدن از جمله پروتئین ها، ویتامین ها و مواد معدنی در دسترس خواهند بود در مورد این سبک غذایی حفظ تعادل مصرف مواد غذایی برای جلوگیری از افزایش دریافت موادی مانند سدیم، کلسترول و چربی های ترانس حائز اهمیت است   ',
            options: [],
        },
        {
            text: 'این سبک غذایی به چه میزان مورد علاقه شماست؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'این سبک غذایی به چه میزان توسط شما استفاده می‌شود؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'سبک غذایی Ketogenic: تمرکز اصلی این سبک غذایی، دریافت انرژی مورد نیاز بدن از منابع چربی و پروتئینی به جای کربوهیدرات هاست و به همین دلیل، مصرف روزانه کربوهیدرات ها به کمتر از 50 گرم در روز می رسد استفاده از این سبک می تواند باعث کاهش ریسک ابتلا به بیماری های قلبی و کاهش وزن شود. البته این سبک غذایی بیش تر به هدف کاهش وزن انتخاب می شود تا بهبود عملکرد کلی بدن با  توجه به کاهش شدید مصرف  کربوهیدرات، مبتلایان به بعضی از اختلالات مانند دیابت نوع اول باید باید با حساسیت بیش تری این سبک را انتخاب کنند ',
            options: [],
        },
        {
            text: 'این سبک غذایی به چه میزان مورد علاقه شماست؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'این سبک غذایی به چه میزان توسط شما استفاده می‌شود؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'سبک غذایی Vegeterian:           در این سبک غذایی پرطرفدار، در کنار استفاده از منابع گیاهی به عنوان منبع اصلی تامین مواد مغذی، از فرآورده های لبنی و تخم مرغ هم استفاده می شود                     به علت استفاده زیاد از میوه و سبزیجات، آنتی اکسیدان و فیبر به مقدار کافی به بدن می رسد که از نتایج آن می توان به کاهش ریسک ابتلا به سرطان، دیابت و چاقی اشاره کرد                        چون از موادی مانند انواع گوشت استفاده نمی شود، باید در انتخاب مواد غذایی برای رسیدن به رژیمی متناسب به خصوص در مورد پروتئین ها توجه زیادی کرد           ',
            options: [],
        },
        {
            text: 'این سبک غذایی به چه میزان مورد علاقه شماست؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'این سبک غذایی به چه میزان توسط شما استفاده می‌شود؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'سبک غذایی Pescatarian:           فرق این سبک غذایی با Vegeterian در استفاده از ماهی و غذاهای دریایی به اضافه منابع قبل است                       به دلیل وجود ماهی، پروتئین مورد نیاز بدن به راحتی تامین می شود. علاوه بر داشتن مزایای سبک Vegeterian، امکان انتخاب مواد غذایی در مقیاس گسترده تری وجود دارد                        این سبک غذایی معایب زیادی ندارد ولی ممکن است در صورت استفاده از آبزیان موجود در مناطق با آلودگی های زیست محیطی، ضررهایی به بدن وارد شود             Vegeterian، امکان انتخاب مواد غذایی در مقیاس گسترده تری وجود دارد این رژیم معایب زیادی ندارد ولی ممکن است در صورت استفاده از آبزیان موجود در مناطق با آلودگی های زیست محیطی، ضررهایی به بدن وارد شود ',
            options: [],
        },
        {
            text: 'این سبک غذایی به چه میزان مورد علاقه شماست؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'این سبک غذایی به چه میزان توسط شما استفاده می‌شود؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'سبک غذایی Vegan:            فرق این سبک با Vegeterian در حذف تمامی منابع با منشا حیوانی مانند فرآورده های لبنی، تخم مرغ و عسل است                        این سبک مزایا و معایبی مانند Vegeterian دارد ولی چون انتخاب ها محدودتر هستند، فقط در صورت انتخاب کاملا بادقت می توان تمام مواد مغذی مورد نیاز بدن را فراهم کرد             Vegeterian دارد ولی چون انتخاب ها محدودتر هستند، فقط در صورت انتخاب کاملا بادقت می توان تمام مواد مغذی مورد نیاز بدن را فراهم کرد: ',
            options: [],
        },
        {
            text: 'این سبک غذایی به چه میزان مورد علاقه شماست؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'این سبک غذایی به چه میزان توسط شما استفاده می‌شود؟',
            options: ['0', '25%', '50%', '75%', '100%'],
        },
        {
            text: 'در ادامه جدولی شامل ارزش غذایی موادی که مصرف بیشتری در کشورمان دارند تهیه شده است که توجه به آن و سبک‌های غذایی معرفی شده در مراحل قبل، در کنار گرفتن مشاوره از پشتیبان می‌تواند کمک شایانی به بهبود سبک غذایی بکند.\
            (اطلاعات این جدول به ازای هر 100 گرم از محصول گردآوری شده است.)\
            \
            در صورت دسترسی به گوشی/ساعت هوشمند می توانید از نرم افزار Nutrition Info برای داشتن اطلاعات جامع تر در این زمینه استفاده کنید',
            options: [],
        },
        // Add more questions here
    ];

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
    };

    const handleNext = () => {
        if (questions[currentQuestion].options.length !== 0 && selectedValue === null) { } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedValue(null);
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
                        {(currentQuestion === 3) && (
                            <div>
                                <Accordion className={classes.accordion} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>روز اول</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <table className={classes.table} >
                                                <thead className={classes.tableHead}>
                                                    <tr>
                                                        <th>ساعت</th>
                                                        <th>غذا</th>
                                                        <th>مقدار (کالری)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table1Rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td className={classes.tableRow}>{row.time}</td>
                                                            <td className={classes.tableRow}>{row.food}</td>
                                                            <td className={classes.tableRow}>{row.calories}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    placeholder='ساعت'
                                                    value={detailsInput[0].time}
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[0].time = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[0].food}
                                                    placeholder='نام غذا'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[0].food = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[0].calories}
                                                    placeholder='مقدار کالری'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[0].calories = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className={classes.button} style={{ width: '100%', borderRadius: '10px' }} onClick={handleAddRow1}>اضافه</button>
                                        </Box>


                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>روز دوم</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <table className={classes.table} >
                                                <thead className={classes.tableHead}>
                                                    <tr>
                                                        <th>ساعت</th>
                                                        <th>غذا</th>
                                                        <th>مقدار (کالری)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table2Rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.time}</td>
                                                            <td>{row.food}</td>
                                                            <td>{row.calories}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    placeholder='ساعت'
                                                    value={detailsInput[1].time}
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[1].time = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[1].food}
                                                    placeholder='نام غذا'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[1].food = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[1].calories}
                                                    placeholder='مقدار کالری'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[1].calories = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className={classes.button} style={{ width: '100%', borderRadius: '10px' }} onClick={handleAddRow2}>اضافه</button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography>روز سوم</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <table className={classes.table} >
                                                <thead className={classes.tableHead}>
                                                    <tr>
                                                        <th>ساعت</th>
                                                        <th>غذا</th>
                                                        <th>مقدار (کالری)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table3Rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.time}</td>
                                                            <td>{row.food}</td>
                                                            <td>{row.calories}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    placeholder='ساعت'
                                                    value={detailsInput[2].time}
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[2].time = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[2].food}
                                                    placeholder='نام غذا'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[2].food = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[2].calories}
                                                    placeholder='مقدار کالری'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[2].calories = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className={classes.button} style={{ width: '100%', borderRadius: '10px' }} onClick={handleAddRow3}>اضافه</button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography>روز چهارم</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <table className={classes.table} >
                                                <thead className={classes.tableHead}>
                                                    <tr>
                                                        <th>ساعت</th>
                                                        <th>غذا</th>
                                                        <th>مقدار (کالری)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table4Rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.time}</td>
                                                            <td>{row.food}</td>
                                                            <td>{row.calories}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    placeholder='ساعت'
                                                    value={detailsInput[3].time}
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[3].time = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[3].food}
                                                    placeholder='نام غذا'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[3].food = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[3].calories}
                                                    placeholder='مقدار کالری'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[3].calories = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className={classes.button} style={{ width: '100%', borderRadius: '10px' }} onClick={handleAddRow4}>اضافه</button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                    >
                                        <Typography>روز پنجم</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <table className={classes.table} >
                                                <thead className={classes.tableHead}>
                                                    <tr>
                                                        <th>ساعت</th>
                                                        <th>غذا</th>
                                                        <th>مقدار (کالری)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table5Rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.time}</td>
                                                            <td>{row.food}</td>
                                                            <td>{row.calories}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    placeholder='ساعت'
                                                    value={detailsInput[4].time}
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[4].time = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[4].food}
                                                    placeholder='نام غذا'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[4].food = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                            <Box style={{ width: "30%", }}>
                                                <Input
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={detailsInput[4].calories}
                                                    placeholder='مقدار کالری'
                                                    onChange={(e) => {
                                                        const updatedDetailsInput = [...detailsInput];
                                                        updatedDetailsInput[4].calories = e.target.value;
                                                        setDetailsInput(updatedDetailsInput);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className={classes.button} style={{ width: '100%', borderRadius: '10px' }} onClick={handleAddRow5}>اضافه</button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )}

                        {(currentQuestion === 32) && (
                            <div>
                                <a href="https://apps.apple.com/us/app/nutrition-info/id1099513418" target="_blank" rel="noreferrer" style={{ color: "blue" }}> <img style={{ width: "80px" }} src="https://is2-ssl.mzstatic.com/image/thumb/Purple116/v4/4a/0f/e7/4a0fe7e6-80c6-6608-d9b0-c7169ff3a433/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg" alt="n info" /> </a>
                            </div>
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
                <>
                    <table className={classes.table}>
                        <thead className={classes.tableHead}>
                            <tr>
                                <td>نام محصول</td>
                                <td>محتوای کالری
                                    (کیلو کالری)</td>
                                <td>پروتئین
                                    (گرم)</td>
                                <td>چربی
                                    (گرم)</td>
                                <td>کربوهیدرات
                                    (گرم)</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>پنیر فتا</td>
                                <td>264</td>
                                <td>14.20</td>
                                <td>21.3</td>
                                <td>4.1</td>
                            </tr>
                            <tr>
                                <td>شیر کم چرب </td>
                                <td>45</td>
                                <td>12.00</td>
                                <td>16.5</td>
                                <td>9.5</td>
                            </tr>
                            <tr>
                                <td> شیر پرچرب</td>
                                <td>62</td>
                                <td>2.90</td>
                                <td>3.5</td>
                                <td>4.7</td>
                            </tr>
                            <tr>
                                <td>دوغ</td>
                                <td>41</td>
                                <td>3.30</td>
                                <td>10</td>
                                <td>19.4</td>
                            </tr>
                            <tr>
                                <td> خامه کم چرب</td>
                                <td>207</td>
                                <td>2.50</td>
                                <td>20</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>خامه پرچرب </td>
                                <td>337</td>
                                <td>2.20</td>
                                <td>35</td>
                                <td>3.2</td>
                            </tr>
                            <tr>
                                <td>ماست کم چرب</td>
                                <td>57</td>
                                <td>4.10</td>
                                <td>1.5</td>
                                <td>5.9</td>
                            </tr>
                            <tr>
                                <td>  ماست پرچرب</td>
                                <td>68</td>
                                <td>5.00</td>
                                <td>32</td>
                                <td>3.5</td>
                            </tr>
                            <tr>
                                <td>بستنی خامه ای</td>
                                <td>183</td>
                                <td>3.30</td>
                                <td>10</td>
                                <td>19.4</td>
                            </tr>
                            <tr>
                                <td> تخم مرغ</td>
                                <td>157</td>
                                <td>12.70</td>
                                <td>11.5</td>
                                <td>0.7</td>
                            </tr>
                            <tr>
                                <td>  تخم بلدرچین</td>
                                <td>168</td>
                                <td>11.90</td>
                                <td>13.1</td>
                                <td>0.6</td>
                            </tr>
                            <tr>
                                <td> ماهی قزل آلا صورتی</td>
                                <td>140</td>
                                <td>20.50</td>
                                <td>6.5</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>میگو</td>
                                <td>98</td>
                                <td>20.50</td>
                                <td>1.6</td>
                                <td>0.3</td>
                            </tr>
                            <tr>
                                <td>نان ورقه شده    </td>
                                <td>262</td>
                                <td>7.50</td>
                                <td>2.9</td>
                                <td>51.4</td>
                            </tr>
                            <tr>
                                <td> ذرت شیرین</td>
                                <td>86</td>
                                <td>3.20</td>
                                <td>1.2</td>
                                <td>19</td>
                            </tr>
                            <tr>
                                <td>ماکارونی آب پز</td>
                                <td>98</td>
                                <td>3.60</td>
                                <td>0.4</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>  کلوچه های شکری</td>
                                <td>417</td>
                                <td>7.50</td>
                                <td>9.8</td>
                                <td>74.4</td>
                            </tr>
                            <tr>
                                <td>دانه برنج</td>
                                <td>303</td>
                                <td>7.50</td>
                                <td>2.6</td>
                                <td>62.3</td>
                            </tr>
                            <tr>
                                <td> نان گندم</td>
                                <td>235</td>
                                <td>7.90</td>
                                <td>0</td>
                                <td>49.2</td>
                            </tr>
                            <tr>
                                <td> نان آرد کامل</td>
                                <td>247</td>
                                <td>13.00</td>
                                <td>3.4</td>
                                <td>41.3</td>
                            </tr>
                            <tr>
                                <td> نان با سبوس</td>
                                <td>242</td>
                                <td>8.20</td>
                                <td>2.6</td>
                                <td>46.3</td>
                            </tr>
                            <tr>
                                <td>  نخود فرنگی</td>
                                <td>299</td>
                                <td>23.00</td>
                                <td>1.6</td>
                                <td>48.1</td>
                            </tr>
                            <tr>
                                <td> نخود</td>
                                <td>309</td>
                                <td>20.10</td>
                                <td>4.3</td>
                                <td>46.1</td>
                            </tr>
                            <tr>
                                <td>سویا</td>
                                <td>364</td>
                                <td>34.90</td>
                                <td>17.3</td>
                                <td>17.3</td>
                            </tr>
                            <tr>
                                <td>لوبیا</td>
                                <td>298</td>
                                <td>21.00</td>
                                <td>2</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>عدس</td>
                                <td>295</td>
                                <td>24.00</td>
                                <td>1.5</td>
                                <td>46.3</td>
                            </tr>
                            <tr>
                                <td>بادام زمینی</td>
                                <td>552</td>
                                <td>26.30</td>
                                <td>45.2</td>
                                <td>9.9</td>
                            </tr>
                            <tr>
                                <td>گردو</td>
                                <td>656</td>
                                <td>16.20</td>
                                <td>60.8</td>
                                <td>11.1</td>
                            </tr>
                            <tr>
                                <td>کنجد</td>
                                <td>565</td>
                                <td>19.40</td>
                                <td>48.7</td>
                                <td>12.2</td>
                            </tr>
                            <tr>
                                <td>بادام</td>
                                <td>609</td>
                                <td>18.60</td>
                                <td>53.7</td>
                                <td>13</td>
                            </tr>
                            <tr>
                                <td>تخمه آفتابگردان</td>
                                <td>601</td>
                                <td>20.70</td>
                                <td>52.9</td>
                                <td>105</td>
                            </tr>
                            <tr>
                                <td>پسته</td>
                                <td>560</td>
                                <td>20.20</td>
                                <td>45.3</td>
                                <td>27.2</td>
                            </tr>
                            <tr>
                                <td>پیاز</td>
                                <td>41</td>
                                <td>1.40</td>
                                <td>0.2</td>
                                <td>8.2</td>
                            </tr>
                            <tr>
                                <td>بادمجان</td>
                                <td>24</td>
                                <td>1.20</td>
                                <td>0.1</td>
                                <td>4.5</td>
                            </tr>
                            <tr>
                                <td>کلم بروکلی</td>
                                <td>34</td>
                                <td>2.80</td>
                                <td>0.4</td>
                                <td>6.6</td>
                            </tr>
                            <tr>
                                <td>سیب زمینی</td>
                                <td>77</td>
                                <td>2.00</td>
                                <td>0.4</td>
                                <td>16.3</td>
                            </tr>
                            <tr>
                                <td>هویج</td>
                                <td>35</td>
                                <td>1.30</td>
                                <td>0.1</td>
                                <td>6.9</td>
                            </tr>
                            <tr>
                                <td>خیار</td>
                                <td>14</td>
                                <td>0.80</td>
                                <td>0.1</td>
                                <td>2.5</td>
                            </tr>
                            <tr>
                                <td>گوجه فرنگی</td>
                                <td>24</td>
                                <td>1.10</td>
                                <td>0.2</td>
                                <td>3.8</td>
                            </tr>
                            <tr>
                                <td>کاهو</td>
                                <td>16</td>
                                <td>1.50</td>
                                <td>0.2</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>آووکادو</td>
                                <td>160</td>
                                <td>2.00</td>
                                <td>14.6</td>
                                <td>1.8</td>
                            </tr>
                            <tr>
                                <td>موز</td>
                                <td>96</td>
                                <td>1.50</td>
                                <td>0.5</td>
                                <td>21</td>
                            </tr>
                            <tr>
                                <td>لیمو</td>
                                <td>34</td>
                                <td>0.90</td>
                                <td>0.1</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>سیب</td>
                                <td>47</td>
                                <td>0.40</td>
                                <td>0.4</td>
                                <td>9.8</td>
                            </tr>
                            <tr>
                                <td>قارچ سفید</td>
                                <td>34</td>
                                <td>3.70</td>
                                <td>1.7</td>
                                <td>1.1</td>
                            </tr>
                            <tr>
                                <td> آب آناناس</td>
                                <td>52</td>
                                <td>0.30</td>
                                <td>0.1</td>
                                <td>11.8</td>
                            </tr>
                            <tr>
                                <td>آب پرتقال</td>
                                <td>45</td>
                                <td>0.70</td>
                                <td>0.2</td>
                                <td>10.4</td>
                            </tr>
                            <tr>
                                <td>آب انار</td>
                                <td>56</td>
                                <td>0.30</td>
                                <td>0.1</td>
                                <td>14.2</td>
                            </tr>
                            <tr>
                                <td>آب هویج</td>
                                <td>56</td>
                                <td>1.10</td>
                                <td>0.1</td>
                                <td>12.6</td>
                            </tr>
                            <tr>
                                <td>آب سیب</td>
                                <td>46</td>
                                <td>0.50</td>
                                <td>0.1</td>
                                <td>10.1</td>
                            </tr>
                            <tr>
                                <td>روغن آفتابگردان</td>
                                <td>899</td>
                                <td>0.00</td>
                                <td>99.9</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>روغن نارگیل</td>
                                <td>899</td>
                                <td>0.00</td>
                                <td>99.9</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>روغن زیتون</td>
                                <td>898</td>
                                <td>0.00</td>
                                <td>99.8</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>کره</td>
                                <td>661</td>
                                <td>0.80</td>
                                <td>72.5</td>
                                <td>1.3</td>
                            </tr>
                            <tr>
                                <td>قند</td>
                                <td>399</td>
                                <td>0.00</td>
                                <td>0</td>
                                <td>99.8</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button component={Link} to="/quizzes" type='button' variant='contained' style={{ margin: "20px auto 80px" }}>بازگشت</Button>
                </>
            )}
        </div >
    );
};

export default Nutrition;
