// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
    // Toggle content visibility
    const toggleButtons = document.querySelectorAll('.toggle-content');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent.classList.contains('hidden-content')) {
                // If it's currently hidden, show it
                targetContent.style.display = 'block';
                targetContent.classList.remove('hidden-content');
                this.textContent = 'إخفاء المحتوى';
            }
        });
    });

    // Quran Player Functionality
    const listenButton = document.getElementById('listenButton');
    const miniPlayer = document.getElementById('miniPlayer');
    const quranAudio = document.getElementById('quranAudio');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const miniPlayBtn = document.getElementById('miniPlayBtn');
    const closeMiniBtn = document.getElementById('closeMiniBtn');

    let isPlaying = false;
    let isPaused = false;

    function togglePlayer() {
        if (isPlaying) {
            if (isPaused) {
                resumePlayer();
            } else {
                pausePlayer();
            }
        } else {
            startPlayer();
        }
    }

    function startPlayer() {
        // إيقاف أي فيديو يعمل حالياً
        pauseAllVideos();

        miniPlayer.style.display = 'flex';
        listenButton.textContent = 'إيقاف مؤقت';
        listenButton.classList.add('active');

        quranAudio.play().then(() => {
            isPlaying = true;
            isPaused = false;
            updatePlayPauseIcon();
        }).catch(error => {
            console.error('حدث خطأ في تشغيل الصوت:', error);
            alert('تعذر تشغيل البث المباشر. يرجى التحقق من اتصال الإنترنت أو إعدادات المتصفح.');
        });
    }

    function pausePlayer() {
        quranAudio.pause();
        isPaused = true;
        listenButton.textContent = 'استئناف التشغيل';
        updatePlayPauseIcon();
    }

    function resumePlayer() {
        quranAudio.play();
        isPaused = false;
        listenButton.textContent = 'إيقاف مؤقت';
        updatePlayPauseIcon();
    }

    function stopPlayer() {
        quranAudio.pause();
        quranAudio.currentTime = 0;
        miniPlayer.style.display = 'none';
        listenButton.textContent = 'اســــــــتـمـع الآن';
        listenButton.classList.remove('active');
        isPlaying = false;
        isPaused = false;
        updatePlayPauseIcon();
    }

    function updatePlayPauseIcon() {
        if (isPlaying && !isPaused) {
            playPauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
        } else {
            playPauseIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
    }

    // Event Listeners for Quran Player
    listenButton.addEventListener('click', togglePlayer);
    closeMiniBtn.addEventListener('click', stopPlayer);
    miniPlayBtn.addEventListener('click', togglePlayer);
    quranAudio.volume = 0.9; // Default volume

    quranAudio.addEventListener('pause', () => {
        if (isPlaying && !isPaused) {
            isPaused = true;
            updatePlayPauseIcon();
        }
    });

    quranAudio.addEventListener('play', () => {
        if (isPaused) {
            isPaused = false;
            updatePlayPauseIcon();
        }
    });

    // Quiz Modal
    const quizBtn = document.querySelector('.floating-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const closeQuizBtn = quizModal.querySelector('.close-modal');

    quizBtn.addEventListener('click', function () {
        quizModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        startQuiz();
    });

    closeQuizBtn.addEventListener('click', function () {
        quizModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearTimeout(autoNextTimer);
    });

    window.addEventListener('click', function (event) {
        if (event.target === quizModal) {
            quizModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            clearTimeout(autoNextTimer);
        }
    });

    // Full quiz questions array
    const allQuizQuestions = [
        {
            question: "من هو أول من جمع المصحف الشريف؟",
            options: [
                { text: "أبو بكر الصديق رضي الله عنه", correct: true },
                { text: "عمر بن الخطاب رضي الله عنه", correct: false },
                { text: "عثمان بن عفان رضي الله عنه", correct: false },
                { text: "علي بن أبي طالب رضي الله عنه", correct: false }
            ]
        },
        {
            question: "كم عدد سور القرآن الكريم؟",
            options: [
                { text: "112 سورة", correct: false },
                { text: "114 سورة", correct: true },
                { text: "116 سورة", correct: false },
                { text: "118 سورة", correct: false }
            ]
        },
        {
            question: "ما هي أطول سورة في القرآن الكريم؟",
            options: [
                { text: "سورة البقرة", correct: true },
                { text: "سورة آل عمران", correct: false },
                { text: "سورة النساء", correct: false },
                { text: "سورة المائدة", correct: false }
            ]
        },
        {
            question: "كم عدد أركان الإسلام؟",
            options: [
                { text: "أربعة أركان", correct: false },
                { text: "خمسة أركان", correct: true },
                { text: "ستة أركان", correct: false },
                { text: "سبعة أركان", correct: false }
            ]
        },
        {
            question: "ما هو أول مسجد بني في الإسلام؟",
            options: [
                { text: "المسجد الحرام", correct: false },
                { text: "المسجد النبوي", correct: false },
                { text: "المسجد الأقصى", correct: false },
                { text: "مسجد قباء", correct: true }
            ]
        },
        {
            question: "بم دعا أيوب عليه السلام ربه؟",
            options: [
                { text: "رب هب لي حكما وألحقني بالصالحين", correct: false },
                { text: "رب أنزلني منزلا مباركا وأنت خير المنزلين", correct: false },
                { text: "لا إله إلا أنت سبحانك إني كنت من الظالمين", correct: false },
                { text: "أني مسني الضر وأنت أرحم الراحمين", correct: true }
            ]
        },

        {
            question: "من ينتهي نسبه الي نوح عليه السلام؟",
            options: [
                { text: "هود عليه السلام", correct: false },
                { text: "لوط عليه السلام", correct: false },
                { text: "صالح عليه السلام", correct: false },
                { text: "ابراهيم عليه السلام", correct: true }
            ]
        },
        {
            question: "كم مرة ذكر اسم أيوب عليه السلام في القرآن الكريم؟",
            options: [
                { text: "ست مرات", correct: false },
                { text: "ثلاث مرات", correct: false },
                { text: "خمس مرات", correct: false },
                { text: "أربع مرات", correct: true }
            ]
        },
        {
            question: "كم عدد مراتب التلاوة؟",
            options: [
                { text: "مرتبتان", correct: false },
                { text: "أربع مراتب", correct: false },
                { text: "خمس مراتب", correct: false },
                { text: "ثلاث مراتب", correct: true }
            ]
        },
        {
            question: "كم كان عمر أيوب عليه السلام حينما توفي؟",
            options: [
                { text: "مائة سنة", correct: false },
                { text: "تسعون سنة", correct: false },
                { text: "ثمانون سنة", correct: false },
                { text: "ثلاثة وتسعون سنة", correct: true }
            ]
        },
        {
            question: "من هو أبو يوسف عليه السلام؟",
            options: [
                { text: "اسماعيل عليه السلام", correct: false },
                { text: "نوح عليه السلام", correct: false },
                { text: "ادريس عليه السلام", correct: false },
                { text: "يعقوب عليه السلام", correct: true }
            ]
        },
        {
            question: "في عهد من من الخلفاء جمع القرآن الكريم؟",
            options: [
                { text: "علي بن أبي طالب", correct: false },
                { text: "عمر بن خطاب", correct: false },
                { text: "عثمان بن عفان", correct: false },
                { text: "أبو بكر الصديق", correct: true }
            ]
        },
        {
            question: "أين ولد يوسف عليه السلام؟",
            options: [
                { text: "الحجاز", correct: false },
                { text: "كنعان", correct: false },
                { text: "مصر", correct: false },
                { text: "حران", correct: true }
            ]
        },
        {
            question: "أول علم نشاء في القرآن؟",
            options: [
                { text: "الناسخ والمنسوخ", correct: false },
                { text: "الاعجاز العلمي", correct: false },
                { text: "التفسير", correct: false },
                { text: "التجويد", correct: true }
            ]
        },
        {
            question: "بم سمي العام السابق لحادثة الاسراء والمعراج؟",
            options: [
                { text: "عام المعراج", correct: false },
                { text: "عام الاسراء", correct: false },
                { text: "عام الفيل", correct: false },
                { text: "عام الحزن", correct: true }
            ]
        },
        {
            question: "ماذا رأت قريش بعد 20 يوم من نزول الوحي علي سيدنا محمد ﷺ؟",
            options: [
                { text: "هبوب الرياح", correct: false },
                { text: "انشقاق القمر", correct: false },
                { text: "اهتزاز جبل أحد", correct: false },
                { text: "نجوم تتطاير", correct: true }
            ]
        },
        {
            question: "من يقرأ القرآن ويتتعتع (يتئتئ) فيه له وعو عليه شاق فان له؟",
            options: [
                { text: "ليس له أجر", correct: false },
                { text: "الأجر كامل", correct: false },
                { text: "نص الأجر", correct: false },
                { text: "أجران", correct: true }
            ]
        },
        {
            question: "من شقيق يوسف عليه السلام من أمه؟",
            options: [
                { text: "أشير", correct: false },
                { text: "نفتان", correct: false },
                { text: "لاوي", correct: false },
                { text: "بنيامين", correct: true }
            ]
        },
        {
            question: "ما المقصود بمرات التلاوة في التجويد؟",
            options: [
                { text: "أنواعها من حيث القراء والرواة", correct: false },
                { text: "أنواعها من حيث اتقان التجويد", correct: false },
                { text: "لا شيء محدد", correct: false },
                { text: "أنواعها من حيث السرعة والبطء", correct: true }
            ]
        },
        {
            question: "من رأى النبي ﷺ في السماء الثانية الي جانب عيسي عليه السلام؟",
            options: [
                { text: "زكريا عليه السلام", correct: false },
                { text: "موسى عليه السلام", correct: false },
                { text: "أيوب عليه السلام", correct: false },
                { text: "يحي عليه السلام", correct: true }
            ]
        },
        {
            question: "من رأى النبي ﷺ في السماء الرابعة؟",
            options: [
                { text: "هارون عليه السلام", correct: false },
                { text: "موسى عليه السلام", correct: false },
                { text: "ابراهيم عليه السلام", correct: false },
                { text: "ادريس عليه السلام", correct: true }
            ]
        },
        {
            question: "من رأى النبي ﷺ في السماء الخامسة؟",
            options: [
                { text: "ادريس عليه السلام", correct: false },
                { text: "موسى عليه السلام", correct: false },
                { text: "ابراهيم عليه السلام", correct: false },
                { text: "هارون عليه السلام", correct: true }
            ]
        },
        {
            question: "من هي أم يوسف عليه السلام؟",
            options: [
                { text: "بلها", correct: false },
                { text: "زلفى", correct: false },
                { text: "ليا", correct: false },
                { text: "راحيل", correct: true }
            ]
        },
        {
            question: "يأتي القرآن الكريم يوم القيامة : ......",
            options: [
                { text: "شهيدا لأصحابه", correct: false },
                { text: "حسيبا لأصحابه", correct: false },
                { text: "صديق لأصحابه", correct: false },
                { text: "شفيعا لأصحابه", correct: true }
            ]
        },
        {
            question: "ماذا قرر اخوت يوسف عليه السلام أن يفعلوا به في بادئ الأمر؟",
            options: [
                { text: "رميه في الصحراء", correct: false },
                { text: "يأكله الذئب", correct: false },
                { text: "القاء في البئر", correct: false },
                { text: "قتله", correct: true }
            ]
        },
        {
            question: "من الذي كان ظل يرعي أيوب عليه السلام في مرضه؟",
            options: [
                { text: "ولده", correct: false },
                { text: "والده", correct: false },
                { text: "والدته", correct: false },
                { text: "زوجته", correct: true }
            ]
        },
        {
            question: "﴿ اركض برجلك هذا مغتسل بارد وشراب﴾ [ سورة ص : 42] ما معني (اركض( في هذه الأية",
            options: [
                { text: "ادخل", correct: false },
                { text: "ارفع", correct: false },
                { text: "اجري", correct: false },
                { text: "اضرب", correct: true }
            ]
        },
        {
            question: "ما معنى مصطلح (التراويح)؟",
            options: [
                { text: "الاجتهاد", correct: false },
                { text: "الركوع الطويل", correct: false },
                { text: "السجود الطويل", correct: false },
                { text: "جلسات الاستراحة", correct: true }
            ]
        },
        {
            question: "﴿ومن الليل فتهجد به نافلة لك عسى أن يبعثك ربك مقاما محمودا﴾ [ الإسراء : 79] - ما هو التهجد؟",
            options: [
                { text: "الدعاء ليلا", correct: false },
                { text: "نوافل رمضان", correct: false },
                { text: "قيام الليل", correct: false },
                { text: "الصلاة ليلا بعد النوم", correct: true }
            ]
        },
        {
            question: "ما الذي بقي سليم في أيوب عليه السلام أثناء ابتلائه؟",
            options: [
                { text: "عينه وأذنه", correct: false },
                { text: "يده ورجله", correct: false },
                { text: "قلبه وكبده", correct: false },
                { text: "قلبه ولسانه", correct: true }
            ]
        },
        {
            question: "﴿ ........ خير من ألف شهر﴾ أكمل المحذوف",
            options: [
                { text: "ليل مباركة", correct: false },
                { text: "الجمعة", correct: false },
                { text: "شهر رمضان", correct: false },
                { text: "ليلة القدر", correct: true }
            ]
        },
        {
            question: "﴿ ........ الذي أنزل فيه القرآن هدى للناس وبينات من الهدى والفرقان﴾ أكمل المحذوف",
            options: [
                { text: "ليل مباركة", correct: false },
                { text: "الجمعة", correct: false },
                { text: "ليلة القدر", correct: false },
                { text: "شهر رمضان", correct: true }
            ]
        },
        {
            question: "﴿ ........ ۝۱ ولیال عشر ۝۲ وٱلشفع وٱلوتر﴾ أكمل المحذوف",
            options: [
                { text: "والشمس", correct: false },
                { text: "والصبح", correct: false },
                { text: "والعصر", correct: false },
                { text: "والفجر", correct: true }
            ]
        },
        {
            question: "﴿ ........ ۝۱ إن ٱلإنسان لفی خسر ۝۲ إلا ٱلذین ءامنوا وعملوا ٱلصلحت وتواصوا بٱلحق وتواصوا بٱلصبر ۝۳﴾ أكمل المحذوف",
            options: [
                { text: "والشمس", correct: false },
                { text: "والصبح", correct: false },
                { text: "والفجر", correct: false },
                { text: "والعصر", correct: true }
            ]
        },
        {
            question: "﴿ ........ وضحىها ۝۱ وٱلقمر إذا تلىها ۝۲ وٱلنهار إذا جلىها ۝۳﴾ أكمل المحذوف",
            options: [
                { text: "والضحي", correct: false },
                { text: "والصبح", correct: false },
                { text: "والفجر", correct: false },
                { text: "والليل", correct: true }
            ]
        },
        {
            question: "﴿ ........ إذا یغشى ۝۱ وٱلنهار إذا تجلى ۝۲ وما خلق ٱلذكر وٱلأنثى ۝۳﴾ أكمل المحذوف",
            options: [
                { text: "والليل", correct: false },
                { text: "والصبح", correct: false },
                { text: "والفجر", correct: false },
                { text: "والضحي", correct: true }
            ]
        },
        {
            question: "﴿ ........ ۝۱ وٱلیل إذا سجى ۝۲ ما ودعك ربك وما قلى ۝۳﴾ أكمل المحذوف",
            options: [
                { text: "والليل", correct: false },
                { text: "والصبح", correct: false },
                { text: "والفجر", correct: false },
                { text: "والضحي", correct: true }
            ]
        },
        {
            question: "﴿وإذا سألك عبادی عنی فإنی قریب أجیب دعوة ٱلداع إذا دعان فلیستجیبوا لی ولیؤمنوا بی لعلهم ........ ﴾ أكمل المحذوف",
            options: [
                { text: "يعقلون", correct: false },
                { text: "يفقهون", correct: false },
                { text: "يؤمنون", correct: false },
                { text: "يرشدون", correct: true }
            ]
        },
        {
            question: "﴿حتى إذا جاء أحدهم ٱلموت قال رب ٱرجعون ۝۹۹ لعلی أعمل صلحا فیما تركت كلا إنها كلمة هو قاىٕلها ومن وراىٕهم برزخ إلى یوم ........ ۝۱۰۰﴾ أكمل المحذوف",
            options: [
                { text: "يرجعون", correct: false },
                { text: "يردون", correct: false },
                { text: "يسألون", correct: false },
                { text: "يبعثون", correct: true }
            ]
        },
        {
            question: "﴿إنا أنزلنه فی ........ إنا كنا منذرین ۝۳ فیها یفرق كل أمر حكیم ۝٤﴾ أكمل المحذوف",
            options: [
                { text: "ليل الاسراء", correct: false },
                { text: "ليلة القدر", correct: false },
                { text: "ليلة طاهرة", correct: false },
                { text: "ليلة مباركة", correct: true }
            ]
        },
        {
            question: "ما معني اسم يوسف عليه السلام؟",
            options: [
                { text: "عبد الله", correct: false },
                { text: "الخلق الحسن", correct: false },
                { text: "الوجه الحسن", correct: false },
                { text: "الله يمنح ويضاعف", correct: true }
            ]
        },
        {
            question: "عدد أقسام علم التجويد؟",
            options: [
                { text: "ست أقسام", correct: false },
                { text: "قسم واحد", correct: false },
                { text: "ثلاث أقسام", correct: false },
                { text: "قسمين", correct: true }
            ]
        },
        {
            question: "ما الذي أمر الله به أيوب عليه السلام ليشفي من مرضه؟",
            options: [
                { text: "خذ أربعة من الطير", correct: false },
                { text: "أضرب بعصاك الحجر", correct: false },
                { text: "أدخل يدك في جيبك", correct: false },
                { text: "اركض برجلك", correct: true }
            ]
        },
        {
            question: "كم لبس يوسف عليه السلام في الجب؟",
            options: [
                { text: "يومان", correct: false },
                { text: "خمس أيام", correct: false },
                { text: "أربع أيام", correct: false },
                { text: "ثلاثة أيام", correct: true }
            ]
        },
        {
            question: "ما الدليل الذي جاء به أخوة يوسف عليه السلام ليثبتوا لأبيهم أنه أكله الذئب؟",
            options: [
                { text: "أقسموا لأبيهم", correct: false },
                { text: "ذئب", correct: false },
                { text: "رجل يشهد زورا", correct: false },
                { text: "دم مزيف", correct: true }
            ]
        },
        {
            question: "ما أين أتي أخوة يوسف عليه السلام بالدم الكذب الذي كان على قميصه؟",
            options: [
                { text: "من حصان", correct: false },
                { text: "من ذئب", correct: false },
                { text: "من جمل", correct: false },
                { text: "من ماغز", correct: true }
            ]
        },
        {
            question: "من أتهم في قتل يوسف عليه السلام؟",
            options: [
                { text: "الثعبان", correct: false },
                { text: "الأفعي", correct: false },
                { text: "الثعلب", correct: false },
                { text: "الذئب", correct: true }
            ]
        },
        {
            question: "كيف عرف يعقوب عليه السلام أن أبنائه يكذبون في قتل يوسف عليه السلام؟",
            options: [
                { text: "القميص لمن يكن ليوسف عليه السلام", correct: false },
                { text: "بكائهم المزيف", correct: false },
                { text: "من الدم المزيف", correct: false },
                { text: "القميص لم يكن ممزق", correct: true }
            ]
        },
        {
            question: "متي كانت حادثة الاسراء والمعراج؟",
            options: [
                { text: "قبل البعثة", correct: false },
                { text: "أثناء الهجرة", correct: false },
                { text: "بعد الهجرة", correct: false },
                { text: "قبل الهجرة", correct: true }
            ]
        },
        {
            question: "شبه رسول الله ﷺ قارئ القرآن ب : ......",
            options: [
                { text: "التمر", correct: false },
                { text: "الحنظله", correct: false },
                { text: "الريحانة", correct: false },
                { text: "الأترجة", correct: true }
            ]
        },
        {
            question: "ما معني (الاسراء)؟",
            options: [
                { text: "الارتقاء", correct: false },
                { text: "الصعود", correct: false },
                { text: "الهبوط", correct: false },
                { text: "السير ليلا", correct: true }
            ]
        },
        {
            question: "ما معني (المعراج)؟",
            options: [
                { text: "السير ليلا", correct: false },
                { text: "السير ببظء", correct: false },
                { text: "الهبوط", correct: false },
                { text: "الصعود", correct: true }
            ]
        },
        {
            question: "من أين أسري برسول الله ﷺ؟",
            options: [
                { text: "مسجد قباء", correct: false },
                { text: "المسجد النبوي", correct: false },
                { text: "من المسجد الأقصي", correct: false },
                { text: "من المسجد الحرام", correct: true }
            ]
        },
        {
            question: "من أين عرج برسول الله ﷺ؟",
            options: [
                { text: "مسجد قباء", correct: false },
                { text: "المسجد النبوي", correct: false },
                { text: "من المسجد الحرام", correct: false },
                { text: "من المسجد الأقصى", correct: true }
            ]
        },
        {
            question: "ما الدابة التي ركبها الرسول ﷺ في ليلة الاسراء والمعراج؟",
            options: [
                { text: "السراق", correct: false },
                { text: "الجمل", correct: false },
                { text: "الحصان", correct: false },
                { text: "البراق", correct: true }
            ]
        },
        {
            question: "أين عاش أيوب عليه السلام؟",
            options: [
                { text: "الحجر", correct: false },
                { text: "مصر", correct: false },
                { text: "حران", correct: false },
                { text: "حوران", correct: true }
            ]
        },
        {
            question: "ما اسم العام الذي ولد رسول الله ﷺ فيه؟",
            options: [
                { text: "عام الحزن", correct: false },
                { text: "عام المعراج", correct: false },
                { text: "عام الاسراء", correct: false },
                { text: "عام الفيل", correct: true }
            ]
        },
        {
            question: "ما هو لقب يوسف عليه السلام الذي ذكر في القرآن؟",
            options: [
                { text: "الصبور", correct: false },
                { text: "الكريم", correct: false },
                { text: "الأمين", correct: false },
                { text: "الصديق", correct: true }
            ]
        },
        {
            question: "كم مرة ذكر اسم يوسف عليه السلام في القرآن الكريم؟",
            options: [
                { text: "عشر مرات", correct: false },
                { text: "خمسة عشر مرة", correct: false },
                { text: "عشرون مرة", correct: false },
                { text: "سبع وعشرون مرة", correct: true }
            ]
        },
        {
            question: "من أخرج يوسف عليه السلام من البئر؟",
            options: [
                { text: "اخواته", correct: false },
                { text: "جنود عزيز مصر", correct: false },
                { text: "خرج بنفسه", correct: false },
                { text: "قافلة من مصر", correct: true }
            ]
        },
        {
            question: "ماذا فعل أخوة يوسف عليه السلام عندما علموا أن المسافرين أخذوه عبدا؟",
            options: [
                { text: "تقاتلوا معهم", correct: false },
                { text: "أخذوه منهم", correct: false },
                { text: "تركوه لهم", correct: false },
                { text: "باعوه لهم", correct: true }
            ]
        },
        {
            question: "ماذا فعل عزيز مصر بيوسف عليه السلام بعد شرائه له؟",
            options: [
                { text: "أذله وأهانه", correct: false },
                { text: "عامله كعبد", correct: false },
                { text: "باعه لشخص أخر", correct: false },
                { text: "أكرمه وأحسن إليه", correct: true }
            ]
        },
        {
            question: "ماذا فعل عزيز مصر بعدما أكتشف براءة يوسف عليه السلام؟",
            options: [
                { text: "حبس زوجته", correct: false },
                { text: "اتهم يوسف", correct: false },
                { text: "طلق زوجته", correct: false },
                { text: "أمر يوسف بكتمان ما حدث", correct: true }
            ]
        },
        {
            question: "كم رجل دخل مع يوسف عليه السلام للسجن؟",
            options: [
                { text: "أربعة", correct: false },
                { text: "واحد", correct: false },
                { text: "ثلاثة", correct: false },
                { text: "اثنان", correct: true }
            ]
        },
        {
            question: "لماذا دخل يوسف عليه السلام السجن؟",
            options: [
                { text: "بسبب ظلم الملك", correct: false },
                { text: "بسبب مكر نساء المدينة", correct: false },
                { text: "بسبب خطأ منه", correct: false },
                { text: "بسبب اتهام زوجة عزيز مصر له", correct: true }
            ]
        },
        {
            question: "ماذا طلب يوسف عليه السلام من الذي ظن أنه سينجو من السجن؟",
            options: [
                { text: "يساعده على الهروب", correct: false },
                { text: "يرسل له طعام", correct: false },
                { text: "يرسل رسالة لأهله", correct: false },
                { text: "يبرئه عند الملك", correct: true }
            ]
        },
        {
            question: "لماذا رفض يوسف عليه السلام الخروج من السجن في بادئ الأمر؟",
            options: [
                { text: "خشي من وزراء الملك", correct: false },
                { text: "أراد مكافأة أو تعويض", correct: false },
                { text: "خاف من كيد النسوة", correct: false },
                { text: "ليظهر براءته", correct: true }
            ]
        },
        {
            question: "من قال (الآن حصحص الحق)؟",
            options: [
                { text: "أحد السجينين", correct: false },
                { text: "يوسف عليه السلام", correct: false },
                { text: "عزيز مصر", correct: false },
                { text: "أمرأة العزيز", correct: true }
            ]
        },
        {
            question: "ما شرط يوسف على أخوته لكي يعطيهم الطعام؟",
            options: [
                { text: "أن لا يعودا إلى مصر", correct: false },
                { text: "دفع ضعف الثمن", correct: false },
                { text: "أن يأتوا بأبيهم", correct: false },
                { text: "أن يأتوا بأخيهم بنيامين", correct: true }
            ]
        },
        {
            question: "كم استمر ابتلاء أيوب عليه السلام؟",
            options: [
                { text: "عشرون سنة", correct: false },
                { text: "خمس سنين", correct: false },
                { text: "عشر سنين", correct: false },
                { text: "ثماني عشر سنة", correct: true }
            ]
        },
        {
            question: "إلى من ينتهي نسب أيوب عليه السلام؟",
            options: [
                { text: "هود عليه السلام", correct: false },
                { text: "لوط عليه السلام", correct: false },
                { text: "صالح عليه السلام", correct: false },
                { text: "ابراهيم عليه السلام", correct: true }
            ]
        },
        {
            question: "ما هو المصطلح الذي يشير إلى تطبيق أحكام التجويد العلمية على تلاوة القرآن الكريم؟",
            options: [
                { text: "مخارج الحروف", correct: false },
                { text: "التجويد التطبيقي", correct: false },
                { text: "التجويد النظري", correct: false },
                { text: "التجويد العملي", correct: true }
            ]
        },
        {
            question: "في أي قرن تم تدوين علم التجويد النظري؟",
            options: [
                { text: "الرابع للهجرة", correct: false },
                { text: "الأول للهجرة", correct: false },
                { text: "الثالث للهجرة", correct: false },
                { text: "الثاني للهجرة", correct: true }
            ]
        },
        {
            question: "ما هو حكم تعلم التجويد العملي؟",
            options: [
                { text: "سنة مؤكدة", correct: false },
                { text: "مستحب", correct: false },
                { text: "فرض كفاية", correct: false },
                { text: "فرض عين", correct: true }
            ]
        },
        {
            question: "ما الذي نزل على أيوب عليه السلام وهو يغتسل؟",
            options: [
                { text: "لؤلؤ ومرجان", correct: false },
                { text: "مطر من ذهب", correct: false },
                { text: "بعوض من ذهب", correct: false },
                { text: "جراد من ذهب", correct: true }
            ]
        },
        {
            question: "﴿ونمير أهلنا ونحفظ أخانا ونزداد كيل بعير ذلك كيل يسير﴾ [يوسف : 65] - ما المقصود بقول أخوة يوسف (نمير أهلنا)؟",
            options: [
                { text: "ننتقم لأهلنا", correct: false },
                { text: "نصون أهلنا", correct: false },
                { text: "نحفظ أهلنا", correct: false },
                { text: "نأتي بطعام", correct: true }
            ]
        },
        {
            question: "﴿قالوا نفقد صواع الملك ولمن جاء به حمل بعير وأنا به زعيم﴾ [سورة يوسف : 72] - ما المقصود ب (صواع الملك)؟",
            options: [
                { text: "كتاب الملك", correct: false },
                { text: "قلم الملك", correct: false },
                { text: "عصى الملك", correct: false },
                { text: "كاس الملك", correct: true }
            ]
        },
        {
            question: "من الصحابي الذي لقبه عمر بن الخطاب رضي الله عنه بيوسف الأمة؟",
            options: [
                { text: "عمرو بن العاص", correct: false },
                { text: "خالد بن الوليد", correct: false },
                { text: "عثمان بن عفان", correct: false },
                { text: "جرير بن عبدالله", correct: true }
            ]
        },
        {
            question: "كم كان عمر يوسف عليه السلام عندما مات؟",
            options: [
                { text: "بين الستين والثمانين", correct: false },
                { text: "أقل من الثمانين", correct: false },
                { text: "أقل من الستين", correct: false },
                { text: "أكثر من مئة", correct: true }
            ]
        },
        {
            question: "من النبي الذي نقل قبر يوسف عليه السلام من مصر لفلسطين؟",
            options: [
                { text: "أيوب عليه السلام", correct: false },
                { text: "هارون عليه السلام", correct: false },
                { text: "عيسى عليه السلام", correct: false },
                { text: "موسى عليه السلام", correct: true }
            ]
        },
        {
            question: "يرجع نسب رسول الله ﷺ إلى: ......",
            options: [
                { text: "مديان بن ابراهيم", correct: false },
                { text: "اسحاق بن ابراهيم", correct: false },
                { text: "كيسان بن ابراهيم", correct: false },
                { text: "اسماعيل بن ابراهيم", correct: true }
            ]
        },
        {
            question: "من معاني النبوة في اللغة: ......",
            options: [
                { text: "الاخبار", correct: false },
                { text: "التنبؤ", correct: false },
                { text: "الارتفاع", correct: false },
                { text: "جميع ما سبق", correct: true }
            ]
        },
        {
            question: "أي قبيلة يعود نسب رسول الله ﷺ لها؟",
            options: [
                { text: "كهلان", correct: false },
                { text: "جهينة", correct: false },
                { text: "كندة", correct: false },
                { text: "قريش", correct: true }
            ]
        },
        {
            question: "من أعمام رسول الله ﷺ: ......",
            options: [
                { text: "أبو لهب", correct: false },
                { text: "حمزة", correct: false },
                { text: "العباس", correct: false },
                { text: "جميع ما سبق", correct: true }
            ]
        },
        {
            question: "النبي الذي تحدث بلسان عربي؟",
            options: [
                { text: "لوط عليه السلام", correct: false },
                { text: "يونس عليه السلام", correct: false },
                { text: "اليسع عليه السلام", correct: false },
                { text: "شعيب عليه السلام", correct: true }
            ]
        },
        {
            question: "سيدنا محمد ﷺ هو محمد بن عبدالله بن ......",
            options: [
                { text: "بن هاشم بن عبد مناف بن قصي", correct: false },
                { text: "بن عبد المطلب بن عبد مناف بن هاشم", correct: false },
                { text: "بن أبي طالب بن هاشم بن عبد مناف", correct: false },
                { text: "بن عبد المطلب بن هاشم بن عبد مناف", correct: true }
            ]
        },
        {
            question: "أمتد ذرية رسول الله ﷺ من نسل: ......",
            options: [
                { text: "رقية رضي الله عنها", correct: false },
                { text: "أم كلثوم رضي الله عنها", correct: false },
                { text: "زينب رضي الله عنها", correct: false },
                { text: "فاطمة رضي الله عنها", correct: true }
            ]
        },
        {
            question: "كم عدد ابناء رسول الله ﷺ (ذكور وأناث)؟",
            options: [
                { text: "أربع ابناء", correct: false },
                { text: "ثلاث ابناء", correct: false },
                { text: "ست ابناء", correct: false },
                { text: "سبع ابناء", correct: true }
            ]
        },
        {
            question: "كم عدد أولاد رسول الله ﷺ (ذكور)؟",
            options: [
                { text: "أربع أولاد", correct: false },
                { text: "ولدان", correct: false },
                { text: "ست أولاد", correct: false },
                { text: "ثلاث أولاد", correct: true }
            ]
        },
        {
            question: "كم عدد بنات رسول الله ﷺ؟",
            options: [
                { text: "بنتان", correct: false },
                { text: "ثلاث بنات", correct: false },
                { text: "ست بنات", correct: false },
                { text: "أربع بنات", correct: true }
            ]
        },
        {
            question: "﴿ وعباد الرحمن الذين يمشون على الأرض هونا وإذا خاطبهم الجاهلون قالوا ........ ﴾",
            options: [
                { text: "قولا لينا", correct: false },
                { text: "قولا ثقيلا", correct: false },
                { text: "قولا سديدا", correct: false },
                { text: "سلاما", correct: true }
            ]
        },
        {
            question: "ما هو لقب حمزة بن عبد المطلب رضي الله عنه؟",
            options: [
                { text: "سيف الله المسلول", correct: false },
                { text: "أمين الأمة", correct: false },
                { text: "ذو النورين", correct: false },
                { text: "سيد الشهداء", correct: true }
            ]
        },
        {
            question: "من هو الصحابي الذي أهتز لموته عرش الرحمن؟",
            options: [
                { text: "جعفر بن أبي طالب", correct: false },
                { text: "حمزة بن عبد المطلب", correct: false },
                { text: "عثمان بن عفان", correct: false },
                { text: "سعد بن معاذ", correct: true }
            ]
        },
        {
            question: "\"إنا وجدناه صابراً نعم العبد إنه كان أواب\" ما معني أواب؟",
            options: [
                { text: "كثير الصبر", correct: false },
                { text: "كثير الشكر", correct: false },
                { text: "كثير البكاء", correct: false },
                { text: "كثير الرجوع إلى الله", correct: true }
            ]
        },
        {
            question: "من الذي ظل يرعى أيوب أثناء مرضه؟",
            options: [
                { text: "والدته", correct: false },
                { text: "ولده", correct: false },
                { text: "والده", correct: false },
                { text: "زوجته", correct: true }
            ]
        },
        {
            question: "من هو النبي الذي راه الرسول ﷺ جالسا عند باب البيت المعمور؟",
            options: [
                { text: "اسحاق عليه السلام", correct: false },
                { text: "نوح عليه السلام", correct: false },
                { text: "آدم عليه السلام", correct: false },
                { text: "ابراهيم عليه السلام", correct: true }
            ]
        },
        {
            question: "من الصحابي الذي كان أول من صدق قصة الاسراء والمعراج؟",
            options: [
                { text: "عثمان رضي الله عنه", correct: false },
                { text: "خالد بن الوليد رضي الله عنه", correct: false },
                { text: "عمر رضي الله عنه", correct: false },
                { text: "أبو بكر رضي الله عنه", correct: true }
            ]
        },
        {
            question: "من هو القائد المسلم الذي حرر بيت المقدس من الصليبيين؟",
            options: [
                { text: "موسى بن نصير", correct: false },
                { text: "زياد بن طارق", correct: false },
                { text: "محمد الفاتح", correct: false },
                { text: "صلاح الدين", correct: true }
            ]
        },
        {
            question: "ما اسم المعركة التي انتصر فيها صلاح الدين الأيوبي على الصليبيين؟",
            options: [
                { text: "معركة البابلين", correct: false },
                { text: "معركة عين جالوت", correct: false },
                { text: "معركة القادسية", correct: false },
                { text: "معركة حطين", correct: true }
            ]
        },
        {
            question: "من النبي الذي أشار على رسول الله الرجوع إلى ربه ليخفف عدد الصلوات؟",
            options: [
                { text: "لوط عليه السلام", correct: false },
                { text: "عيسى عليه السلام", correct: false },
                { text: "اليسع عليه السلام", correct: false },
                { text: "موسى عليه السلام", correct: true }
            ]
        },
        {
            question: "﴿ إن أصحاب الجنة اليوم في شغل ........ ﴾",
            options: [
                { text: "منعمون", correct: false },
                { text: "متكئون", correct: false },
                { text: "فرحون", correct: false },
                { text: "فاكهون", correct: true }
            ]
        },
        // Adding more questions to have more than 25 in total
        {
            question: "ما هي السورة التي تسمى بـ 'أم القرآن'؟",
            options: [
                { text: "سورة البقرة", correct: false },
                { text: "سورة الفاتحة", correct: true },
                { text: "سورة الإخلاص", correct: false },
                { text: "سورة يس", correct: false }
            ]
        },
        {
            question: "من هو النبي الذي يلقب بـ 'أبو البشر'؟",
            options: [
                { text: "نوح عليه السلام", correct: false },
                { text: "إبراهيم عليه السلام", correct: false },
                { text: "آدم عليه السلام", correct: true },
                { text: "محمد صلى الله عليه وسلم", correct: false }
            ]
        },
        {
            question: "ما هي أول سورة نزلت على النبي محمد صلى الله عليه وسلم؟",
            options: [
                { text: "سورة الفاتحة", correct: false },
                { text: "سورة العلق", correct: true },
                { text: "سورة المدثر", correct: false },
                { text: "سورة القلم", correct: false }
            ]
        },
        // Add more questions to make a total of at least 30 questions
        {
            question: "من هم الخلفاء الراشدون؟",
            options: [
                { text: "أبو بكر، عمر، عثمان، علي", correct: true },
                { text: "أبو بكر، عمر، معاوية، علي", correct: false },
                { text: "عمر، عثمان، علي، الحسن", correct: false },
                { text: "أبو بكر، عمر، عثمان، معاوية", correct: false }
            ]
        },
        {
            question: "من هي أول امرأة آمنت بالرسول محمد صلى الله عليه وسلم؟",
            options: [
                { text: "عائشة رضي الله عنها", correct: false },
                { text: "خديجة رضي الله عنها", correct: true },
                { text: "فاطمة رضي الله عنها", correct: false },
                { text: "أم سلمة رضي الله عنها", correct: false }
            ]
        },
        {
            question: "كم عدد أجزاء القرآن الكريم؟",
            options: [
                { text: "29 جزء", correct: false },
                { text: "30 جزء", correct: true },
                { text: "31 جزء", correct: false },
                { text: "33 جزء", correct: false }
            ]
        },
        {
            question: "من هو النبي الذي ألقي في النار ولم تحرقه؟",
            options: [
                { text: "موسى عليه السلام", correct: false },
                { text: "نوح عليه السلام", correct: false },
                { text: "إبراهيم عليه السلام", correct: true },
                { text: "يعقوب عليه السلام", correct: false }
            ]
        },
        {
            question: "من هو الصحابي الملقب بـ 'أمين الأمة'؟",
            options: [
                { text: "أبو بكر الصديق", correct: false },
                { text: "عمر بن الخطاب", correct: false },
                { text: "عثمان بن عفان", correct: false },
                { text: "أبو عبيدة بن الجراح", correct: true }
            ]
        },
        {
            question: "كم سنة استمرت دعوة النبي محمد صلى الله عليه وسلم؟",
            options: [
                { text: "13 سنة", correct: false },
                { text: "23 سنة", correct: true },
                { text: "33 سنة", correct: false },
                { text: "43 سنة", correct: false }
            ]
        },
        {
            question: "متى فرضت الصلاة على المسلمين؟",
            options: [
                { text: "قبل الهجرة", correct: true },
                { text: "بعد الهجرة", correct: false },
                { text: "في غزوة بدر", correct: false },
                { text: "بعد فتح مكة", correct: false }
            ]
        },
        {
            question: "ما هي أصغر سورة في القرآن الكريم؟",
            options: [
                { text: "سورة الفيل", correct: false },
                { text: "سورة العصر", correct: false },
                { text: "سورة الكوثر", correct: true },
                { text: "سورة الناس", correct: false }
            ]
        },
        {
            question: "ما هو اسم زوجة فرعون التي آمنت بموسى عليه السلام؟",
            options: [
                { text: "مريم", correct: false },
                { text: "سارة", correct: false },
                { text: "آسية", correct: true },
                { text: "هاجر", correct: false }
            ]
        },
        {
            question: "من هو النبي الذي كلم الله تعالى مباشرة؟",
            options: [
                { text: "إبراهيم عليه السلام", correct: false },
                { text: "محمد صلى الله عليه وسلم", correct: false },
                { text: "موسى عليه السلام", correct: true },
                { text: "عيسى عليه السلام", correct: false }
            ]
        },
        {
            question: "أين ولد النبي محمد صلى الله عليه وسلم؟",
            options: [
                { text: "المدينة المنورة", correct: false },
                { text: "مكة المكرمة", correct: true },
                { text: "الطائف", correct: false },
                { text: "جدة", correct: false }
            ]
        },
        {
            question: "ما هو عدد الأشهر الحرم؟",
            options: [
                { text: "3 أشهر", correct: false },
                { text: "4 أشهر", correct: true },
                { text: "5 أشهر", correct: false },
                { text: "6 أشهر", correct: false }
            ]
        },
        {
            question: "من هو أول شهيد في الإسلام؟",
            options: [
                { text: "سمية بنت خياط", correct: true },
                { text: "حمزة بن عبد المطلب", correct: false },
                { text: "ياسر بن عامر", correct: false },
                { text: "بلال بن رباح", correct: false }
            ]
        },
        {
            question: "كم عدد أركان الإيمان؟",
            options: [
                { text: "خمسة أركان", correct: false },
                { text: "ستة أركان", correct: true },
                { text: "سبعة أركان", correct: false },
                { text: "ثمانية أركان", correct: false }
            ]
        },
        {
            question: "ما هي السورة التي تعادل ثلث القرآن؟",
            options: [
                { text: "سورة الفاتحة", correct: false },
                { text: "سورة الكهف", correct: false },
                { text: "سورة يس", correct: false },
                { text: "سورة الإخلاص", correct: true }
            ]
        },
        {
            question: "ما اسم زوجة النبي إبراهيم عليه السلام وأم نبي الله إسحاق؟",
            options: [
                { text: "سارة", correct: true },
                { text: "هاجر", correct: false },
                { text: "آسية", correct: false },
                { text: "مريم", correct: false }
            ]
        },
        {
            question: "من هو آخر الأنبياء والمرسلين؟",
            options: [
                { text: "عيسى عليه السلام", correct: false },
                { text: "إبراهيم عليه السلام", correct: false },
                { text: "محمد صلى الله عليه وسلم", correct: true },
                { text: "موسى عليه السلام", correct: false }
            ]
        },
        {
            question: "ما هي الصلاة التي تصلى ركعتين ويجهر فيها بالقراءة؟",
            options: [
                { text: "الظهر", correct: false },
                { text: "العصر", correct: false },
                { text: "الفجر", correct: true },
                { text: "العشاء", correct: false }
            ]
        },
        {
            question: "من هو الصحابي الملقب بـ 'سيف الله المسلول'؟",
            options: [
                { text: "خالد بن الوليد", correct: true },
                { text: "سعد بن أبي وقاص", correct: false },
                { text: "أبو عبيدة بن الجراح", correct: false },
                { text: "الزبير بن العوام", correct: false }
            ]
        },
        {
            question: "كم عدد غزوات النبي صلى الله عليه وسلم؟",
            options: [
                { text: "17 غزوة", correct: false },
                { text: "21 غزوة", correct: false },
                { text: "27 غزوة", correct: true },
                { text: "33 غزوة", correct: false }
            ]
        }
    ];

    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let selectedOption = null;
    let quizAnswered = false;
    let correctAnswers = 0;
    let totalQuestions = 20;
    let autoNextTimer = null;

    function startQuiz() {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        quizAnswered = false;
        selectedOption = null;
        clearTimeout(autoNextTimer);

        // Reset UI
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-question" id="quiz-question"></div>
            <div class="quiz-options" id="quiz-options"></div>
            <div class="quiz-feedback" id="quiz-feedback"></div>
            <div class="quiz-navigation">
                <div class="quiz-progress" id="quiz-progress">1 / ${totalQuestions}</div>
            </div>
        `;
        quizContainer.style.opacity = '1';

        quizQuestions = getRandomQuestions(allQuizQuestions, totalQuestions);
        loadQuestion(0);
    }

    function getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadQuestion(index) {
        clearTimeout(autoNextTimer);

        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.style.display = 'none';
            feedback.className = 'quiz-feedback';
            feedback.innerHTML = '';
        }

        const question = quizQuestions[index];
        document.getElementById('quiz-question').textContent = question.question;

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        const shuffledOptions = shuffleArray([...question.options]);

        shuffledOptions.forEach((option) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option.text;
            if (option.correct) {
                optionElement.dataset.correct = 'true';
            }

            optionElement.addEventListener('click', function () {
                if (quizAnswered) return;

                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                this.classList.add('selected');
                selectedOption = this;
                checkAnswer();
            });

            optionsContainer.appendChild(optionElement);
        });

        document.getElementById('quiz-progress').textContent = `${index + 1} / ${totalQuestions}`;
        quizAnswered = false;
        selectedOption = null;
    }

    function checkAnswer() {
        if (!selectedOption || quizAnswered) return;

        quizAnswered = true;
        const isCorrect = selectedOption.hasAttribute('data-correct');

        if (isCorrect) {
            selectedOption.classList.add('correct');
            document.getElementById('quiz-feedback').innerHTML = `
                <i class="fas fa-check-circle"></i> 
                <span>أحسنت! إجابة صحيحة</span>
                <div class="feedback-details" style="margin-top:10px;font-weight:normal;"></div>
            `;
            document.getElementById('quiz-feedback').className = 'quiz-feedback correct';
            correctAnswers++;
        } else {
            selectedOption.classList.add('wrong');

            let correctAnswerText = '';
            document.querySelectorAll('.quiz-option').forEach(opt => {
                if (opt.hasAttribute('data-correct')) {
                    opt.classList.add('correct');
                    correctAnswerText = opt.textContent;
                }
            });

            document.getElementById('quiz-feedback').innerHTML = `
                <i class="fas fa-times-circle"></i> 
                <span>للأسف، إجابة خاطئة</span>
                <div class="feedback-details" style="margin-top:10px;font-weight:normal;">
                    الإجابة الصحيحة: ${correctAnswerText}
                </div>
            `;
            document.getElementById('quiz-feedback').className = 'quiz-feedback wrong';
        }

        const feedbackElement = document.getElementById('quiz-feedback');
        feedbackElement.style.display = 'block';
        feedbackElement.style.animation = 'none';
        setTimeout(() => {
            feedbackElement.style.animation = isCorrect ? 'pulseGreen 1s' : 'pulseRed 1s';
        }, 10);

        clearTimeout(autoNextTimer);
        autoNextTimer = setTimeout(() => {
            goToNextQuestion();
        }, 2000);
    }

    function goToNextQuestion() {
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.style.opacity = '0';

        setTimeout(() => {
            currentQuestionIndex++;

            if (currentQuestionIndex < totalQuestions) {
                loadQuestion(currentQuestionIndex);
                quizContainer.style.opacity = '1';
            } else {
                showFinalResults();
            }
        }, 300);
    }

    function showFinalResults() {
        const quizContainer = document.querySelector('.quiz-container');
        const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

        quizContainer.innerHTML = `
            <div class="quiz-complete">
                <div class="quiz-question">انتهى الاختبار!</div>
                <div class="quiz-feedback correct" style="display: block; animation: pulseGreen 1s">
                    <div class="score-result">
                        <div class="score-percentage">${scorePercentage}%</div>
                        <div class="score-text">لقد أجبت على ${correctAnswers} من أصل ${totalQuestions} سؤال بشكل صحيح</div>
                    </div>
                </div>
                <div class="quiz-navigation">
                    <button class="quiz-btn quiz-restart">إعادة الاختبار</button>
                </div>
            </div>
        `;
        quizContainer.style.opacity = '1';

        document.querySelector('.quiz-restart').addEventListener('click', startQuiz);
    }

    // Prayer Times Functionality
    const MAX_RETRIES = 20;
    let retryCounter = 0;
    let retryTimeoutId = null;

    function getPrayerTimes(retry = false) {
        if (retry) {
            retryCounter++;
            console.log(`Retry attempt: ${retryCounter} of ${MAX_RETRIES}`);
        } else {
            retryCounter = 0;
        }

        if (retryCounter >= MAX_RETRIES) {
            console.log("Maximum retry attempts reached. Stopping automatic updates");
            return;
        }

        setAllTimesToLoading();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchPrayerTimesFromAPI(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setAllTimesToDefault();
                    scheduleRetry();
                }
            );
        } else {
            console.error("Geolocation not supported by this browser");
            setAllTimesToDefault();
            scheduleRetry();
        }
    }

    function setAllTimesToLoading() {
        const prayerElements = document.querySelectorAll('.prayer-time p');
        prayerElements.forEach(el => {
            el.textContent = "جاري التحديث .";
        });
    }

    function setAllTimesToDefault() {
        const prayerElements = document.querySelectorAll('.prayer-time p');
        prayerElements.forEach(el => {
            el.textContent = "00:00";
        });
    }

    function fetchPrayerTimesFromAPI(latitude, longitude) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const apiUrl = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=4`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200 && data.data && data.data.timings) {
                    updatePrayerTimesDisplay(data.data.timings);
                    clearScheduledRetry();
                    retryCounter = 0;
                } else {
                    throw new Error("Invalid API response format");
                }
            })
            .catch(error => {
                console.error("Error fetching prayer times:", error);
                setAllTimesToDefault();
                scheduleRetry();
            });
    }

    function updatePrayerTimesDisplay(timings) {
        const prayerTimes = [
            { name: 'الفجر', time: formatTimeTo12Hour(timings.Fajr) },
            { name: 'الظهر', time: formatTimeTo12Hour(timings.Dhuhr) },
            { name: 'العصر', time: formatTimeTo12Hour(timings.Asr) },
            { name: 'المغرب', time: formatTimeTo12Hour(timings.Maghrib) },
            { name: 'العشاء', time: formatTimeTo12Hour(timings.Isha) }
        ];

        const prayerElements = document.querySelectorAll('.prayer-time p');
        prayerElements.forEach((el, index) => {
            if (index < prayerTimes.length) {
                el.textContent = prayerTimes[index].time;
            }
        });
    }

    function formatTimeTo12Hour(timeString) {
        try {
            const timePart = timeString.split(" ")[0];
            const [hours, minutes] = timePart.split(":");

            let hour = parseInt(hours);
            const min = minutes;

            const ampm = hour >= 12 ? 'م' : 'ص';
            hour = hour % 12;
            hour = hour ? hour : 12;

            return `${hour}:${min} ${ampm}`;
        } catch (error) {
            console.error("Error formatting time:", error);
            return "00:00";
        }
    }

    function scheduleRetry() {
        if (retryCounter >= MAX_RETRIES) {
            console.log("Maximum retry attempts reached. No more retries will be scheduled");
            return;
        }

        clearScheduledRetry();

        console.log("Scheduling retry in 2 minutes.");
        retryTimeoutId = setTimeout(() => {
            console.log("Retrying to fetch prayer times.");
            getPrayerTimes(true);
        }, 120000);
    }

    function clearScheduledRetry() {
        if (retryTimeoutId !== null) {
            clearTimeout(retryTimeoutId);
            retryTimeoutId = null;
        }
    }

    window.addEventListener('online', () => {
        console.log("Connection restored. Retrying prayer times.");
        if (retryCounter < MAX_RETRIES) {
            getPrayerTimes();
        } else {
            console.log("Maximum retry attempts already reached. Manual refresh required");
        }
    });

    // Initialize prayer times
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        getPrayerTimes();
    } else {
        document.addEventListener('DOMContentLoaded', getPrayerTimes);
    }

    // Main Section - Categories Grid
    const appData = {
        categories: [
            {
                id: "Prayer",
                icon: "🕌",
                title: "ما يتعلق بالصلاة",
                desc: "الوضوء و الصلاة و بعض الأخطاء المنتشرة و السن المهجورة فيهم",
                goto: "prayer.html"
            },
            {
                id: "hadith",
                icon: "📜",
                title: "الأحاديث النبوية",
                desc: "مجموعة من الأحاديث الصحيحة والحسنة عن رسول الله ﷺ",
                list: "hadithList"
            },
            {
                id: "azkar",
                icon: "📿",
                title: "الأذكار",
                desc: "أذكار الصباح والمساء وأدعية من القرآن الكريم",
                goto: "azkar.html"
            },
            {
                id: "rokya",
                icon: "📕",
                title: "الرقية الشرعية",
                desc: "الرقية الشرعية من القرآن و السنة النبوية",
                list: "rokyaList"
            },
            {
                id: "Fadil",
                icon: "⭐",
                title: "فضل بعض العبادات",
                desc: "فضل الصلاة، الصدقة، الصيام وغيرها من العبادات",
                goto: "fadil.html"
            },
            {
                id: "AllahNames",
                icon: "🕌",
                title: "أسماء الله الحسنى",
                desc: "أسماء الله الحسنى الـ99 إسم مع شرح معانيها وفضائلها",
                list: "allahNamesList"
            },
            {
                id: "ProphetNames",
                icon: "📃",
                title: "أسماء رسول الله ﷺ",
                desc: "أسماء رسول الله الصحيحة وشرح معانيها و نسب الرسول ﷺ",
                list: "prophetNamesList"
            },
            {
                id: "men",
                icon: "🌟",
                title: "العشرة المبشرين بالجنة",
                desc: "جزء من سيرة العشرة المبشرين بالجنة رضوان الله عليهم",
                list: "menList"
            },
            {
                id: "women",
                icon: "👑",
                title: "نساء عظيمة في الإسلام",
                desc: "بعض الصحابيات العظيمات اللواتي خَدَمن الإسلام",
                list: "womenList"
            },
            {
                id: "doaa",
                icon: "🤲",
                title: "أدعية من القرآن",
                desc: "مجموعة من الادعية الواردة في القرآن الكريم",
                list: "doaaList"
            },
            {
                id: "aya",
                icon: "📖",
                title: "آية وعبرة",
                desc: "بعض الآيات و العبرة المستفادة منها",
                list: "ayaList"
            },
            {
                id: "golden",
                icon: "🥇",
                title: "فرص ذهبية",
                desc: "بعض الفرص الذهبية التي عليك استغلالها",
                list: "goldenList"
            },
            {
                id: "signs",
                icon: "🌙",
                title: "علامات الساعة",
                desc: "علامات الساعة الصغرى والكبرى مع شرح بسيط لكل علامة",
                list: "signsList"
            },
            {
                id: "sunna",
                icon: "🚫",
                title: "بعض السنن المهجورة",
                desc: "بعض السنن المهجورة عن رسول الله ﷺ",
                list: "sunnaList"
            },
            {
                id: "beda3",
                icon: "❌",
                title: "بعض البدع المنتشرة",
                desc: "البدع و الامور المستحدثة في الدين التي لم ترد عن رسول الله ﷺ",
                list: "beda3List"
            },
            {
                id: "E3ga",
                icon: "🔎",
                title: "الإعجاز العلمي",
                desc: "الإعجاز العلمي في القرآن الكريم والسنة النبوية",
                list: "e3gaList"
            },
            {
                id: "stories",
                icon: "📚",
                title: "السيرة النبوية",
                desc: "جزء من السيرة النبوية والعشرة المبشرين بالجنة",
                list: "storiesList",
            },
            {
                id: "alBayt",
                icon: "🏡",
                title: "آل بيت الرسول ﷺ",
                desc: "التعرف على آل البيت: زوجات وأولاد وبنات وآل بيت الرسولﷺ",
                list: "alBaytList"
            },
            {
                id: "gazawat",
                icon: "🗡️",
                title: "غزوات الرسول",
                desc: "الغزوات في عهد الرسول ﷺ وبعض تفاصيلها",
                list: "gazawatList"
            },
            {
                id: "Prophets",
                icon: "📖",
                title: "الرسل و الانبياء",
                desc: "الرسل و الانبياء المذكورين في القرآن و السنة النبوية",
                list: "prophetsList"
            },
            {
                id: "AlowEl3azm",
                icon: "📃",
                title: "أولو العزم من الرسل",
                desc: "الصبر وقوة تحمل المشاق من المرسلين الذين ذكرهم الله في القرآن",
                list: "alowEl3azmList"
            }
        ],

        lists: {
            prayerList: [

            ],
            hadithList: [
                "سألت النبي ﷺ: أي العمل أحب إلى الله؟ قال: الصلاة على وقتها قال: ثم أي؟ قال: بر الوالدين قال: ثم أي؟ قال: الجهاد في سبيل الله قال: حدثني بهن، ولو استزدته لزادني.<br><br>الراوي: عبدالله بن مسعود | المحدث: البخاري (صحيح البخاري)",
                "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله العظيم، سبحان الله وبحمده.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                "ركعتا الفجر خير من الدنيا وما فيها.<br><br>الراوي: عائشة أم المؤمنين | المحدث: مسلم (صحيح مسلم)",
                "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى دنيا يصيبها، أو إلى امرأة ينكحها، فهجرته إلى ما هاجر إليه.<br><br>الراوي: عمر بن الخطاب | المحدث: البخاري (صحيح البخاري)",
                "من صلى علي واحدة صلى الله عليه عشرا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "من قال لصاحبه يوم الجمعة ، و الإمام يخطب: أنصت ، فقد لغا<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "عن أبي هريرة رضي الله عنه قال: قال رسول الله ﷺ: (من كذب علي متعمدا فليتبوأ مقعده من النار ) .<br><br>الراوي: أبو هريرة | المحدث: البخاري ومسلم",
                "كل أمتي يدخلون الجنة إلا من أبى، قالوا: يا رسول الله، ومن يأبى؟ قال: من أطاعني دخل الجنة، ومن عصاني فقد أبى.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                " المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف وفي كل خير<br><br>الراوي: أبو هريرة | المحدث: ابن تيمية (مجموع الفتاوى)",
                "لله تبارك وتعالى تسعة وتسعون اسما من أحصاها دخل الجنة<br><br>الراوي: أبو هريرة | المحدث: الطبراني (المعجم الأوسط)",
                "إن الله كتب في كتاب موضوع عنده فوق العرش: إن رحمتي تغلب غضبي ، وفي رواية: تسبق غضبي<br><br>الراوي: - | المحدث: ابن تيمية: (مجموع الفتاوى)",
                "لا يؤمن أحدكم حتى أكون أحب إليه من ولده ، ووالده ، والناس أجمعين<br><br>الراوي: أنس بن مالك | المحدث: الألباني (صحيح الجامع)",
                "لا يؤمن أحدكم، حتى يحب لأخيه ما يحب لنفسه.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "خيركم من تعلم القرآن وعلمه<br><br>الراوي: عثمان بن عفان | المحدث: الألباني (صحيح الترمذي)",
                "أن نافع بن عبد الحارث لقي عمر بعسفان، وكان عمر يستعمله على مكة، فقال: من استعملت على أهل الوادي، فقال: ابن أبزى، قال: ومن ابن أبزى؟ قال: مولى من موالينا، قال: فاستخلفت عليهم مولى؟! قال: إنه قارئ لكتاب الله عز وجل، وإنه عالم بالفرائض، قال عمر: أما إن نبيكم ﷺ قد قال: إن الله يرفع بهذا الكتاب أقواما، ويضع به آخرين.<br><br>الراوي: عمر بن الخطاب | المحدث: مسلم (صحيح مسلم)",
                "اقرأ القرآن في كل شهر قال قلت: إني أجد قوة، قال: فاقرأه في عشرين ليلة قال قلت: إني أجد قوة، قال: فاقرأه في سبع ولا تزد على ذلك.<br><br>الراوي: عبدالله بن عمرو | المحدث: مسلم (صحيح مسلم)",
                "لا حسد إلا في اثنتين: رجل علمه الله القرآن، فهو يتلوه آناء الليل، وآناء النهار، فسمعه جار له، فقال: ليتني أوتيت مثل ما أوتي فلان، فعملت مثل ما يعمل، ورجل آتاه الله مالا فهو يهلكه في الحق، فقال رجل: ليتني أوتيت مثل ما أوتي فلان، فعملت مثل ما يعمل.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                "لا تجعلوا بيوتكم مقابر، إن الشيطان ينفر من البيت الذي تقرأ فيه سورة البقرة.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "من قرأ الآيتين من آخر سورة البقرة في ليلة كفتاه<br><br>االراوي: أبو مسعود عقبة بن عمرو | المحدث: ابن حبان (صحيح ابن حبان)",
                "من حفظ عشر آيات من أول سورة الكهف عصم من الدجال.<br><br>الراوي: أبو الدرداء | المحدث: مسلم (صحيح مسلم)",
                "من يرد الله به خيرا يفقهه في الدين، وإنما أنا قاسم ويعطي الله، ولن يزال أمر هذه الأمة مستقيما حتى تقوم الساعة، أو: حتى يأتي أمر الله.<br><br>الراوي: معاوية بن أبي سفيان | المحدث: البخاري (صحيح البخاري)",
                "من سلك طريقا يطلب فيه علما ، سلك الله به طريقا من طرق الجنة ، وإن الملائكة لتضع أجنحتها رضا لطالب العلم ، وإن العالم ليستغفر له من في السماوات ومن في الأرض ، والحيتان في جوف الماء ، وإن فضل العالم على العابد كفضل القمر ليلة البدر على سائر الكواكب ، وإن العلماء ورثة الأنبياء ، وإن الأنبياء لم يورثوا دينارا ولا درهما ، ورثوا العلم فمن أخذه أخذ بحظ وافر<br><br>الراوي: أبو الدرداء | المحدث: الألباني (صحيح أبي داود)",
                "أن رسول الله ﷺ قال: (اجتنبوا السبع الموبقات. قيل: يا رسول الله، وما هن؟ قال: الشرك بالله، والسحر، وقتل النفس التي حرم الله إلا بالحق، وأكل الربا، وأكل مال اليتيم، والتولي يوم الزحف، وقذف المحصنات الغافلات المؤمنات).<br><br>الراوي: أبو هريرة | المحدث: أبو داود (سنن أبي داود)",
                "ألا أنبئكم بأكبر الكبائر قلنا: بلى يا رسول الله، قال: الإشراك بالله، وعقوق الوالدين، وكان متكئا فجلس فقال: ألا وقول الزور، وشهادة الزور، ألا وقول الزور، وشهادة الزور فما زال يقولها، حتى قلت: لا يسكت.<br><br>الراوي: أبو بكرة نفيع بن الحارث | المحدث: البخاري (صحيح البخاري)",
                "أتى النبي ﷺ رجل فقال: يا رسول الله، ما الموجبتان؟ فقال: من مات لا يشرك بالله شيئا دخل الجنة، ومن مات يشرك بالله شيئا دخل النار.<br><br>الراوي: جابر بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "إن بين الرجل وبين الشرك والكفر ترك الصلاة.<br><br>الراوي: جابر بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "كنا مع بريدة في يوم ذي غيم، فقال: بكروا بالصلاة، فإن النبي ﷺ قال: من ترك صلاة العصر حبط عمله.<br><br>الراوي: بريدة بن الحصيب الأسلمي | المحدث: البخاري (صحيح البخاري)",
                "اتقوا الظلم، فإن الظلم ظلمات يوم القيامة، واتقوا الشح، فإن الشح أهلك من كان قبلكم، حملهم على أن سفكوا دماءهم واستحلوا محارمهم.<br><br>الراوي: جابر بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "أتدرون ما الغيبة ؟ ذكرك أخاك بما يكره ، إن كان فيه ما تقول فقد اغتبته ، و إن لم يكن فيه فقد بهته<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "من حمل علينا السلاح فليس منا<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح ابن ماجه)",
                "من حلف على ملة غير الإسلام فهو كما قال، وليس على ابن آدم نذر فيما لا يملك، ومن قتل نفسه بشيء في الدنيا عذب به يوم القيامة، ومن لعن مؤمنا فهو كقتله، ومن قذف مؤمنا بكفر فهو كقتله.<br><br>الراوي: ثابت بن الضحاك | المحدث: البخاري (صحيح البخاري)",
                " إياكم والظن، فإن الظن أكذب الحديث، ولا تحسسوا، ولا تجسسوا، ولا تنافسوا، ولا تحاسدوا، ولا تباغضوا، ولا تدابروا، وكونوا عباد الله إخوانا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "أن رسول الله ﷺ كان يقبل الحسن بن علي، فقال الأقرع بن حابس: إن لي عشرة من الولد، ما قبلت منهم أحدا. فقال رسول الله ﷺ: من لا يرحم، لا يرحم.<br><br>الراوي: أبو هريرة | المحدث: شعيب الأرناؤوط (تخريج المسند لشعيب)",
                "آية المنافق ثلاث: إذا حدث كذب، وإذا وعد أخلف، وإذا ائتمن خان.<br><br>الراوي: أبو هريرة | المحدث: ابن العربي (عارضة الأحوذي)",
                "لا يدخل الجنة قاطع. قال ابن أبي عمر: قال سفيان: يعني قاطع رحم.<br><br>الراوي: جبير بن مطعم | المحدث: مسلم (صحيح مسلم)",
                "أنه بلغه أن رجلا ينم الحديث فقال حذيفة: سمعت رسول الله ﷺ يقول: لا يدخل الجنة نمام.<br><br>الراوي: حذيفة بن اليمان | المحدث: مسلم (صحيح مسلم)",
                "لا يدخل الجنة من لا يأمن جاره بوائقه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الأدب المفرد)",
                "لا يدخل الجنة من كان في قلبه مثقال ذرة من كبر قال رجل: إن الرجل يحب أن يكون ثوبه حسنا ونعله حسنة، قال: إن الله جميل يحب الجمال، الكبر بطر الحق، وغمط الناس.<br><br>الراوي: عبدالله بن مسعود | المحدث: مسلم (صحيح مسلم)",
                "ما زال جبريل يوصيني بالجار حتى ظننت أنه سيورثه<br><br>الراوي: عبدالله بن عمرو | المحدث: الألباني (صحيح الترمذي)",
                "لعن رسول الله ﷺ آكل الربا، ومؤكله، وكاتبه، وشاهديه، وقال: هم سواء.<br><br>الراوي: جابر بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "لعن رسول الله ﷺ المتشبهين من الرجال بالنساء، والمتشبهات من النساء بالرجال<br><br>الراوي: عبدالله بن عباس | المحدث: البخاري (صحيح البخاري)",
                "أشد الناس عذابا يوم القيامة، المصورون<br><br>الراوي: عبدالله | المحدث: العيني (نخب الافكار)",
                "أشد الناس عذابا يوم القيامة اثنان: امرأة عصت زوجها ، وإمام قوم وهم له كارهون<br><br>الراوي: عمرو بن الحارث | المحدث: أحمد شاكر (تخريج سنن الترمذي)",
                "من أتى عرافا فسأله عن شيء فصدقه بما قال لم تقبل له صلاة أربعين يوما<br><br>الراوي: بعض أزواج النبي ﷺ | المحدث: الألباني (غاية المرام)",
                "ليكونن من أمتي أقوام، يستحلون الحر والحرير، والخمر والمعازف<br><br>الراوي: أبو مالك الأشعري | المحدث: ابن باز (مجموع فتاوى ابن باز)",
                "عن عبد الله بن مسعود رضي الله عنه قال: الغناء ينبت النفاق في القلب (من أقوال عبدالله ابن مسعود) <br> <ليس حديث ><br><br>الراوي: عبدالله بن مسعود | المحدث: موفق الدين ابن قدامة (المغني لابن قدامة)",
                "كفى بالمرء كذبا أن يحدث بكل ما سمع<br><br>االراوي: - | المحدث: السخاوي (فتح المغيث)",
                "لا ينظر الله يوم القيامة إلى من جر ثوبه من الخيلاء<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الترغيب)",
                "من رأى منكم منكرا فليغيره بيده فإن لم يستطع فبلسانه . فإن لم يستطع فبقلبه . وذلك أضعف الإيمانrr<br><br>الراوي: أبو سعيد الخدري | المحدث: ابن تيمية (مجموع الفتاوى)",
                "الدين النصيحة. قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.<br><br>الراوي: تميم الداري | المحدث: مسلم (صحيح مسلم)",
                "إنما بعثت لأتمم صالح الأخلاق<br><br>الراوي: أبو هريرة | المحدث: العجلوني (كشف الخفاء)",
                "إن الله تعالى لا ينظر إلى صوركم وأموالكم ، ولكن إنما ينظر إلى قلوبكم وأعمالكم<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "إن الله قدر مقادير الخلائق قبل أن يخلق السموات والأرض بخمسين ألف سنة وكان عرشه على الماء<br><br>الراوي: عبدالله بن عمرو | المحدث: ابن تيمية (مجموع الفتاوى)",
                "عن عبيد بن عمير قال: من يرد الله به خيرا يفقهه في الدين ، ويلهمه رشده فيه .<br><br>الراوي: طلحة بن نافع أبو سفيان | المحدث: الألباني (العلم لأبي خيثمة)",
                "من يرد الله به خيرا يصب منه<br><br>الراوي: أبو هريرة | المحدث: ابن عبدالبر (التمهيد)",
                "إذا أراد الله بعبد خيرا استعمله . فقيل: كيف يستعمله يا رسول الله ؟ قال: يوفقه لعمل صالح قبل الموت<br><br>الراوي: أنس بن مالك | المحدث: الترمذي (سنن الترمذي)",
                "إذا أراد الله بعبد الخير عجل له العقوبة في الدنيا، وإذا أراد الله بعبده الشر مسك عنه بذنبه حتى يوافيه يوم القيامة.<br><br>الراوي: أنس بن مالك | المحدث: ابن حجر العسقلاني (هداية الرواة)",
                "إذا أراد الله عز وجل بعبد خيرا عسله، وهل تدرون ما عسله؟ قالوا: الله عز وجل ورسوله أعلم، قال: يفتح الله عز وجل له عملا صالحا بين يدي موته حتى يرضى عنه جيرانه، أو من حوله.<br><br>الراوي: عمرو بن الحمق | المحدث: شعيب الأرناؤوط (تخريج مشكل الآثار)",
                "لا يلدغ المؤمن من جحر مرتين<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "بشروا ولا تنفروا، ويسروا ولا تعسروا.<br><br>الراوي: أبو موسى الأشعري | المحدث: الألباني (صحيح أبي داود)",
                "الدنيا سجن المؤمن وجنة الكافر<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الترمذي)",
                "يا أيها الناس توبوا إلى الله، فإني أتوب في اليوم إليه مئة مرة.<br><br>الراوي: الأغر المزني أبو مالك | المحدث: مسلم (صحيح مسلم)",
                "و الذي نفسي بيده ، لو لم تذنبوا لذهب الله بكم ، و لجاء بقوم يذنبون فيستغفرون الله فيغفر لهم<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "من تاب قبل أن تطلع الشمس من مغربها، تاب الله عليه.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "لا تنقطع الهجرة حتى تنقطع التوبة و لا تنقطع التوبة حتى تطلع الشمس من مغربها<br><br>الراوي: معاوية بن أبي سفيان | المحدث: الألباني (إرواء الغليل)",
                "لو كان لابن آدم واديان من مال لابتغى واديا ثالثا، ولا يملأ جوف ابن آدم إلا التراب، ويتوب الله على من تاب.<br><br>الراوي: أنس بن مالك | المحدث: مسلم (صحيح مسلم)",
                "البر حسن الخلق ، والإثم ما حاك في صدرك ، وكرهت أن يطلع عليه الناس<br><br>الراوي: النواس بن سمعان الأنصاري | المحدث: الألباني (صحيح الجامع)",
                "لا تحقرن من المعروف شيئا ، ولو أن تلقى أخاك بوجه طلق<br><br>الراوي: أبو ذر الغفاري | المحدث: الألباني (صحيح الجامع)",
                "ما من مسلم يغرس غرسا، أو يزرع زرعا، فيأكل منه طير أو إنسان أو بهيمة؛ إلا كان له به صدقة.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "إذا دعا الرجل لأخيه بظهر الغيب قالت الملائكة آمين ولك بمثل<br><br>الراوي: أبو الدرداء | المحدث: الألباني (صحيح أبي داود)",
                "والذي نفسي بيده لا تدخلوا الجنة حتى تؤمنوا ولا تؤمنوا حتى تحابوا أولا أدلكم على شيء إذا فعلتموه تحاببتم أفشوا السلام بينكم<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح ابن ماجه)",
                "يا أيها الناس أفشوا السلام بينكم وأطعموا الطعام وصلوا الأرحام وصلوا والناس نيام تدخلوا الجنة بسلام<br><br>الراوي: عبدالله بن سلام | المحدث: ابن حجر العسقلاني (الفتوحات الربانية)",
                "مفاتيح الغيب خمس لا يعلمها إلا الله تعالى: لا يعلم أحد ما يكون في غد إلا الله تعالى ، ولا يعلم أحد ما يكون في الأرحام إلا الله تعالى ، ولا يعلم متى تقوم الساعة إلا الله تعالى ، ولا تدري نفس بأي أرض تموت إلا الله تعالى ، ولا يدري أحد متى يجيء المطر إلا الله تعالى<br><br>الراوي: عبدالله بن عمر | المحدث: الألباني (صحيح الجامع)",
                "المسلم أخو المسلم لا يظلمه ولا يسلمه من كان في حاجة أخيه كان الله في حاجته ومن فرج عن مسلم كربة فرج الله بها عنه كربة من كرب يوم القيامة ومن ستر مسلما ستره الله يوم القيامة<br><br>الراوي: عبدالله بن عمر | المحدث: ابن حبان (صحيح ابن حبان)",
                "مثل المؤمنين في توادهم ، وتراحمهم ، وتعاطفهم . مثل الجسد إذا اشتكى منه عضو تداعى له سائر الجسد بالسهر والحمى<br><br>الراوي: النعمان بن بشير | المحدث: الألباني (صحيح الجامع)",
                "حق المسلم على المسلم خمس: رد السلام ، و عيادة المريض ، واتباع الجنائز ، و إجابة الدعوة ، و تشميت العاطس<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "حق المسلم على المسلم ست قيل: ما هن يا رسول الله؟ قال: إذا لقيته فسلم عليه، وإذا دعاك فأجبه، وإذا استنصحك فانصح له، وإذا عطس فحمد الله فسمته، وإذا مرض فعده وإذا مات فاتبعه.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "الساعي على الأرملة والمسكين، كالمجاهد في سبيل الله، أو القائم الليل الصائم النهار.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                "من أحب أن يبسط له في رزقه ، وأن ينسأ له في أثره ، فليصل رحمه<br><br>الراوي: أنس بن مالك وأبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "إن أبر البر صلة المرء أهل ود أبيه بعد أن يولي<br><br>الراوي: عبدالله بن عمر | المحدث: الألباني (صحيح أبي داود)",
                "الدنيا متاع وخير متاعها المرأة الصالحة<br><br>الراوي: عبدالله بن عمرو | المحدث: الزرقاني (مختصر المقاصد)",
                "ما تركت بعدي فتنة أضر على الرجال من النساء.<br><br>الراوي: أسامة بن زيد | المحدث: البخاري (صحيح البخاري)",
                "إن الدنيا حلوة خضرة، وإن الله مستخلفكم فيها، فينظر كيف تعملون، فاتقوا الدنيا واتقوا النساء؛ فإن أول فتنة بني إسرائيل كانت في النساء. وفي رواية: لينظر كيف تعملون.<br><br>الراوي: أبو سعيد الخدري | المحدث: مسلم (صحيح مسلم)",
                "كمل من الرجال كثير، ولم يكمل من النساء غير مريم بنت عمران، وآسية امرأة فرعون، وإن فضل عائشة على النساء كفضل الثريد على سائر الطعام.<br><br>الراوي: أبو موسى الأشعري | المحدث: مسلم (صحيح مسلم)",
                "خير صفوف الرجال أولها، وشرها آخرها، وخير صفوف النساء آخرها، وشرها أولها.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "أن رسول الله ﷺ نهى يوم الفتح عن متعة النساء.<br><br>الراوي: سبرة بن معبد الجهني | المحدث: مسلم (صحيح مسلم)",
                "استوصوا بالنساء خيرا ؛ فإن المرأة خلقت من ضلع ، وإن أعوج شيء في الضلع أعلاه ؛ فإن ذهبت تقيمه كسرته ، وإن تركته لم يزل أعوج ؛ فاستوصوا بالنساء خيرا<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "عن البراء، قال: آخر آية أنزلت من القرآن: {يستفتونك قل الله يفتيكم في الكلالة} [النساء:176].<br><br>الراوي: أبو إسحاق السبيعي عمرو بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "ليس الشديد بالصرعة ، إنما الشديد الذي يملك نفسه عند الغضب<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الأدب المفرد)",
                "من دعا إلى هدى كان له من الأجر مثل أجور من تبعه لا ينقص ذلك من أجورهم شيئا، ومن دعا إلى ضلالة كان عليه من الإثم مثل آثام من تبعه لا ينقص ذلك من آثامهم شيئا.<br><br>الراوي: أبو هريرة | المحدث: أبو داود (سنن أبي داود)",
                "أيما داع دعا إلى ضلالة فاتبع ، فإن عليه مثل أوزار من اتبعه ، و لا ينقص من أوزارهم شيئا ، و أيما داع دعا إلى هدى فاتبع ، فإن له مثل أجور من اتبعه ، و لا ينقص من أجورهم شيئا<br><br>الراوي: أنس بن مالك | المحدث: الألباني (صحيح الجامع)",
                "ما عاب رسول الله ﷺ طعاما قط إن اشتهاه أكله وإن كرهه تركه<br><br>الراوي: أبو هريرة | المحدث: ابن حبان (صحيح ابن حبان)",
                "قرأ عمر بن الخطاب عبس وتولى فلما أتى على هذه الآية وفاكهة وأبا قال: عرفنا ما الفاكهة ، فما الأب ؟ فقال: لعمرك يا ابن الخطاب إن هذا لهو التكلف<br><br>الراوي: أنس بن مالك | المحدث: ابن كثير (تفسير القرآن العظيم)",
                "كنا عند عمر فقال: نهينا عن التكلف.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "ما نقصت صدقة من مال ، وما زاد الله عبدا بعفو إلا عزا ، وما تواضع عبد إلا رفعه الله<br><br>الراوي: أبو هريرة | المحدث: ابن عبدالبر (الاستذكار)",
                "عجبا لأمر المؤمن ، إن أمره كله له خير ، و ليس ذلك لأحد إلا للمؤمن ، إن أصابته سراء شكر وكان خيرا له ، و إن أصابته ضراء صبر فكان خيرا له<br><br>الراوي: صهيب بن سنان الرومي | المحدث: الألباني (صحيح الجامع)",
                "يقول الله: أعددت لعبادي الصالحين ما لا عين رأت، ولا أذن سمعت، ولا خطر على قلب بشر. فاقرأوا إن شئتم فلا تعلم نفس ما أخفي لهم من قرة أعين جزاء بما كانوا يعملون وفي الجنة شجرة يسير الراكب في ظلها مائة عام، لا يقطعها. واقرأوا إن شئتم وظل ممدود وموضع سوط في الجنة خير من الدنيا وما فيها. واقرأوا إن شئتم فمن زحزح عن النار وأدخل الجنة فقد فاز وما الحياة الدنيا إلا متاع الغرور.<br><br>الراوي: أبو هريرة | المحدث: الترمذي (سنن الترمذي)",
                "إن موضع سوط في الجنة خير من الدنيا وما فيها واقرؤوا إن شئتم فمن زحزح عن النار، وأدخل الجنة فقد فاز، وما الحياة الدنيا إلا متاع الغرور<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الترغيب)",
                "شهدت من رسول الله ﷺ مجلسا وصف فيه الجنة حتى انتهى، ثم قال ﷺ في آخر حديثه: فيها ما لا عين رأت، ولا أذن سمعت، ولا خطر على قلب بشر ثم اقترأ هذه الآية: {تتجافى جنوبهم عن المضاجع يدعون ربهم خوفا وطمعا ومما رزقناهم ينفقون * فلا تعلم نفس ما أخفي لهم من قرة أعين جزاء بما كانوا يعملون} [السجدة: 16، 17].<br><br>الراوي: سهل بن سعد الساعدي | المحدث: مسلم (صحيح مسلم)",
                "مثل الذي يذكر ربه والذي لا يذكر ربه، مثل الحي والميت.<br><br>الراوي: أبو موسى الأشعري | المحدث: البخاري (صحيح البخاري)",
                "من قال سبحان الله وبحمده في يوم مائة مرة حطت خطاياه وإن كانت مثل زبد البحر<br><br>الراوي: أبو هريرة | المحدث: ابن عبدالبر (التمهيد)",
                "لأن أقول: سبحان الله والحمد لله ولا إله إلا الله والله أكبر أحب إلي مما طلعت عليه الشمس<br><br>الراوي: أبو هريرة | المحدث: ابن حبان (صحيح ابن حبان)",
                "إذا أكل أحدكم فليذكر اسم الله تعالى، فإن نسي أن يذكر اسم الله تعالى في أوله، فليقل: بسم الله أوله وآخره.<br><br>الراوي: عائشة أم المؤمنين | المحدث: أبو داود (سنن أبي داود)",
                "إذا أكل أحدكم فليأكل بيمينه وإذا شرب فليشرب بيمينه فإن الشيطان يأكل بشماله ويشرب بشماله<br><br>الراوي: عبدالله بن عمر | المحدث: ابن حبان (صحيح ابن )حبان",
                "إذا أكل أحدكم طعاما فليلعق أصابعه ، فإنه لا يدري في أي طعامه تكون البركة<br><br>الراوي: زيد بن ثابت وأنس بن مالك | المحدث: السيوطي (الجامع الصغير)",
                "إذا أكل أحدكم طعاما، فليقل: اللهم بارك لنا فيه، وأطعمنا خيرا منه، وإذا سقي لبنا، فليقل: اللهم بارك لنا فيه، وزدنا منه، فإنه ليس شيء يجزئ من الطعام والشراب إلا اللبن.<br><br>الراوي: عبدالله بن عباس | المحدث: ابن حجر العسقلاني (هداية الرواة)",
                "إذا سقطت لقمة أحدكم فليمط ما بها من الأذى ، و ليأكلها ، و لا يدعها للشيطان ، و لا يمسح يده بالمنديل ؛ حتى يلعقها أو يلعقها ، فإنه لا يدري في أي طعامه البركة<br><br>الراوي: جابر بن عبدالله | المحدث: الألباني (صحيح الجامع)",
                "إن الله ليرضى من العبد أن يأكل الأكلة فيحمده عليها ويشرب الشربة فيحمده عليها<br><br>الراوي: أنس بن مالك | المحدث: ابن تيمية (مجموع الفتاوى)",
                "لولا أن أشق على أمتي لأمرتهم بالسواك مع كل وضوء<br><br>الراوي: أبو هريرة وعلي بن أبي طالب | المحدث: الألباني (صحيح الجامع)",
                "لولا أن أشق على أمتي لأمرتهم أن يؤخروا العشاء إلى ثلث الليل ، أو نصفه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "لولا أن أشق على المؤمنين ما قعدت خلاف سرية، بمثل حديثهم. وبهذا الإسناد، والذي نفسي بيده، لوددت أني أقتل في سبيل الله، ثم أحيا... بمثل حديث أبي زرعة، عن أبي هريرة. وفي رواية: لولا أن أشق على أمتي لأحببت أن لا أتخلف خلف سرية.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "انتدب الله لمن خرج في سبيله، لا يخرجه إلا إيمان بي وتصديق برسلي، أن أرجعه بما نال من أجر أو غنيمة، أو أدخله الجنة، ولولا أن أشق على أمتي ما قعدت خلف سرية، ولوددت أني أقتل في سبيل الله ثم أحيا، ثم أقتل ثم أحيا، ثم أقتل.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                "أعتم النبي ﷺ ذات ليلة حتى ذهب عامة الليل، وحتى نام أهل المسجد ثم خرج فصلى وقال: إنه لولا أن أشق على أمتي<br><br>الراوي: عائشة أم المؤمنين | المحدث: العيني (نخب الافكار)",
                "عن عبد الله بن عمر، قال: مكثنا ذات ليلة ننتظر رسول الله ﷺ لصلاة العشاء الآخرة، فخرج إلينا حين ذهب ثلث الليل، أو بعده، فلا ندري أشيء شغله في أهله، أو غير ذلك، فقال حين خرج: إنكم لتنتظرون صلاة ما ينتظرها أهل دين غيركم، ولولا أن يثقل على أمتي لصليت بهم هذه الساعة، ثم أمر المؤذن فأقام الصلاة، وصلى.<br><br>الراوي: عبدالله بن عمر | المحدث: مسلم (صحيح مسلم)",
                "أن رسول الله ﷺ شغل عنها ليلة، فأخرها حتى رقدنا في المسجد، ثم استيقظنا، ثم رقدنا، ثم استيقظنا، ثم خرج علينا النبي ﷺ، ثم قال: ليس أحد من أهل الأرض ينتظر الصلاة غيركم. وكان ابن عمر لا يبالي أقدمها أم أخرها إذا كان لا يخشى أن يغلبه النوم عن وقتها، وكان يرقد قبلها، قال ابن جريج: قلت لعطاء: وقال: سمعت ابن عباس يقول: أعتم رسول الله ﷺ ليلة بالعشاء حتى رقد الناس واستيقظوا، ورقدوا واستيقظوا، فقام عمر بن الخطاب فقال: الصلاة - قال عطاء: قال ابن عباس -: فخرج نبي الله ﷺ، كأني أنظر إليه الآن، يقطر رأسه ماء، واضعا يده على رأسه، فقال: لولا أن أشق على أمتي لأمرتهم أن يصلوها هكذا. فاستثبت عطاء كيف وضع النبي ﷺ على رأسه يده، كما أنبأه ابن عباس، فبدد لي عطاء بين أصابعه شيئا من تبديد، ثم وضع أطراف أصابعه على قرن الرأس، ثم ضمها يمرها كذلك على الرأس، حتى مست إبهامه طرف الأذن، مما يلي الوجه على الصدغ، وناحية اللحية، لا يقصر ولا يبطش إلا كذلك، وقال: لولا أن أشق على أمتي لأمرتهم أن يصلوا هكذا.<br><br>الراوي: عبدالله بن عمر | المحدث: البخاري (صحيح البخاري)",
                "علمنا رسول الله التشهد في الصلاة والتشهد في الحاجة فأما التشهد في الصلاة التحيات لله والصلوات والطيبات السلام عليك أيها النبي ورحمة الله وبركاته السلام علينا وعلى عباد الله الصالحين أشهد أن لا إله إلا الله وأشهد أن محمدا عبده ورسوله إلى آخر التشهد<br><br>الراوي: عبدالله بن مسعود | المحدث: الألباني (صحيح النسائي)",
                "من نسي صلاة، أو نام عنها، فكفارتها أن يصليها إذا ذكرها.<br><br>الراوي: أنس بن مالك | المحدث: مسلم (صحيح مسلم)",
                "صلاة الجماعة تفضل صلاة الفذ بخمس وعشرين درجة<br><br>الراوي: أبو سعيد الخدري | المحدث: الألباني (صحيح الجامع)",
                "دخل عثمان بن عفان المسجد بعد صلاة المغرب، فقعد وحده، فقعدت إليه فقال: يا ابن أخي، سمعت رسول الله ﷺ يقول: من صلى العشاء في جماعة فكأنما قام نصف الليل، ومن صلى الصبح في جماعة فكأنما صلى الليل كله.<br><br>الراوي: عثمان بن عفان | المحدث: مسلم (صحيح مسلم)",
                "إذا دخل أحدكم المسجد فليركع ركعتين قبل أن يجلس.<br><br>الراوي: أبو قتادة الحارث بن ربعي | المحدث: البخاري (صحيح البخاري)",
                "إذا دخل أحدكم المسجد فليسلم على النبي ﷺ، ثم ليقل: اللهم افتح لي أبواب رحمتك، فإذا خرج فليقل: اللهم إني أسألك من فضلك.<br><br>الراوي: أبو حميد أو أبو أسيد الساعدي | المحدث: أبو داود (سنن أبي داود)",
                "أقرب ما يكون العبد من ربه، وهو ساجد، فأكثروا الدعاء.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية ، وعلم ينتفع به ، وولد صالح يدعو له<br><br>الراوي: - | المحدث: ابن تيمية (مجموع الفتاوى)",
                "أن رجلا أعرابيا أتى النبي ﷺ، فقال: يا رسول الله، الرجل يقاتل للمغنم، والرجل يقاتل ليذكر، والرجل يقاتل ليرى مكانه، فمن في سبيل الله؟ فقال رسول الله ﷺ: من قاتل لتكون كلمة الله أعلى، فهو في سبيل الله.<br><br>الراوي: أبو موسى الأشعري | المحدث: مسلم (صحيح مسلم)",
                "كان أكثر دعاء النبي ﷺ: اللهم ربنا آتنا في الدنيا حسنة، وفي الآخرة حسنة، وقنا عذاب النار.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "من توضأ فأحسن الوضوء ثم قال: أشهد أن لا إله  الا الله وحده لا شريك له، وأشهد أن محمدا عبده ورسوله . اللهم اجعلني من التوابين، واجعلني من المتطهرين، فتحت له ثمانية أبواب الجنة، يدخل من أيها شاء<br><br>الراوي: عمر بن الخطاب | المحدث: الألباني (صحيح الترمذي)",
                "ألا أدلكم على شيء يكفر الخطايا ، ويزيد في الحسنات ؟ ! . قالوا: بلى يا رسول الله ! قال: إسباغ الوضوء والطهور في المكاره ، وكثرة الخطى إلى هذا المسجد ، والصلاة بعد الصلاة ، وما من أحد يخرج من بيته متطهرا ؛ يأتي المسجد ، فيصلي مع المسلمين أو مع الإمام ، ثم ينتظر الصلاة التي بعد ؛ إلا قالت الملائكة: اللهم ! اغفر له ، اللهم ! ارحمه . فإذا قمتم إلى الصلاة ؛ فاعدلوا صفوفكم ، وسدوا الفرج . فإذا كبر الإمام فكبروا ؛ فإني أراكم من ورائي ، وإذا قال: سمع الله لمن حمده ؛ فقولوا: ربنا ! ولك الحمد . وخير صفوف الرجال المقدم ، وشر صفوف الرجال المؤخر، وخير صفوف النساء المؤخر ، وشر صفوف النساء المقدم ، يا معشر النساء ! إذا سجد الرجال ؛ فاخفضن أبصاركن عن عورات الرجال . فقلت لعبد الله بن أبي بكر: ما يعني بذلك ؟ قال: ضيق الأزر<br><br>الراوي: أبو سعيد الخدري | المحدث: الألباني (صحيح الموارد)",
                "لا تقبل صلاة أحدكم إذا أحدث حتى يتوضأ.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "إذا توضأ العبد المسلم أو المؤمن فغسل وجهه خرج من وجهه كل خطيئة نظر إليها بعينيه مع الماء ، أو مع آخر قطر الماء ، فإذا غسل يديه خرجت من يديه كل خطيئة كان بطشتها يداه مع الماء أو مع آخر قطر الماء ، فإذا غسل رجليه ، خرجت كل خطيئة مشتها رجلاه مع الماء ، أو مع آخر قطر الماء ، حتى يخرج نقيا من الذنوب<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "عن عبد الله بن عمر قال: سنة الصلاة أن تنصب رجلك اليمنى وتثني رجلك اليسرى<br><br>الراوي: عبدالله بن عمر | المحدث: الألباني (صحيح أبي داود)",
                "فإذا جلس في الركعتين جلس على رجله اليسرى فإذا جلس في الركعة الأخيرة قدم رجله اليسرى وجلس على مقعدته<br><br>الراوي: محمد بن عمرو العامري | المحدث: الألباني (صحيح أبي داود)",
                "كنا إذا كنا مع النبي ﷺ في الصلاة، قلنا: السلام على الله من عباده، السلام على فلان وفلان، فقال النبي ﷺ: لا تقولوا السلام على الله، فإن الله هو السلام، ولكن قولوا: التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، فإنكم إذا قلتم أصاب كل عبد في السماء أو بين السماء والأرض، أشهد أن لا إله إلا الله، وأشهد أن محمدا عبده ورسوله، ثم يتخير من الدعاء أعجبه إليه، فيدعو.<br><br>الراوي: عبدالله بن مسعود | المحدث: البخاري (صحيح البخاري)",
                "كنا لا ندري ما نقول في كل ركعتين، غير أن نسبح ونكبر ونحمد ربنا، وإن محمدا ﷺ علم فواتح الخير وخواتمه، فقال: إذا قعدتم في كل ركعتين، فقولوا: التحيات لله، والصلوات، والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدا عبده ورسوله، وليتخير أحدكم من الدعاء أعجبه إليه، فليدع الله عز وجل.<br><br>الراوي: عبدالله بن مسعود | المحدث: الألباني (صحيح النسائي)",
                "من صلى في يوم وليلة اثنتي عشرة ركعة تطوعا غير فريضة بنى الله له بيتا في الجنة.<br><br>الراوي: أم حبيبة أم المؤمنين | المحدث: ابن تيمية (مجموع الفتاوى)",
                "يصبح على كل سلامى من أحدكم صدقة، فكل تسبيحة صدقة، وكل تحميدة صدقة، وكل تهليلة صدقة، وكل تكبيرة صدقة، وأمر بالمعروف صدقة، ونهي عن المنكر صدقة، ويجزئ من ذلك ركعتان يركعهما من الضحى.<br><br>الراوي: أبو ذر الغفاري | المحدث: مسلم (صحيح مسلم)",
                "سئل [أي النبي ﷺ]: أي الصلاة أفضل بعد المكتوبة؟ وأي الصيام أفضل بعد شهر رمضان؟ فقال: أفضل الصلاة بعد الصلاة المكتوبة الصلاة في جوف الليل، وأفضل الصيام بعد شهر رمضان صيام شهر الله المحرم.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "سألت أنس بن مالك: أكان النبي ﷺ يصلي في نعليه؟ قال: نعم.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "كان رسول الله ﷺ يعلمنا الاستخارة كما يعلمنا السورة من القرآن يقول: ( إذا هم أحدكم بالأمر فليركع ركعتين من غير الفريضة ثم ليقل: اللهم إني أستخيرك بعلمك وأستقدرك بقدرتك وأسألك من فضلك العظيم فإنك تقدر ولا أقدر وتعلم ولا أعلم وأنت علام الغيوب اللهم فإن كنت تعلم هذا الأمر - يسميه بعينه - خيرا لي في ديني ومعاشي وعاقبة أمري فقدره لي ويسره لي وبارك فيه وإن كان شرا لي في ديني ومعادي ومعاشي وعاقبة أمري فاصرفه عني واصرفني عنه وقدر لي الخير حيث كان ورضني به )<br><br>الراوي: جابر بن عبدالله | المحدث: شعيب الأرناؤوط (تخريج صحيح ابن حبان)",
                "كان النبي ﷺ إذا صلى الفجر ؛ تربع في مجلسه حتى تطلع الشمس حسناء .<br><br>الراوي: جابر بن سمرة | المحدث: الألباني (هداية الرواة)",
                "من صلى على جنازة فله قيراط ومن انتظرها حتى توضع في اللحد فله قيراطان والقيراطان مثل الجبلين العظيمين<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح النسائي)",
                "كنت نهيتكم عن زيارة القبور ألا فزوروها ، فإنها ترق القلب ، و تدمع العين ، وتذكر الآخرة ، ولا تقولوا هجرا<br><br>الراوي: أنس بن مالك | المحدث: الألباني (صحيح الجامع)",
                "أن النبي ﷺ كان يعتكف العشر الأواخر من رمضان، حتى توفاه الله عز وجل، ثم اعتكف أزواجه من بعده.<br><br>الراوي: عائشة أم المؤمنين | المحدث: مسلم (صحيح مسلم)",
                "من صام رمضان ثم أتبعه ستا من شوال، كان كصيام الدهر.<br><br>الراوي: أبو أيوب الأنصاري | المحدث: مسلم (صحيح مسلم)",
                "أفضل الصيام، بعد رمضان، شهر الله المحرم، وأفضل الصلاة، بعد الفريضة، صلاة الليل.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "صيام يوم عرفة إني أحتسب على الله أن يكفر السنة التي بعده ، والسنة التي قبله<br><br>الراوي: أبو قتادة الحارث بن ربعي | المحدث: الترمذي (سنن الترمذي)",
                "صيام يوم عرفة، إني أحتسب على الله أن يكفر السنة التي قبله، والسنة التي بعده، وصيام يوم عاشوراء، إني أحتسب على الله أن يكفر السنة التي قبله<br><br>الراوي: أبو قتادة | المحدث: السيوطي (الجامع الصغير)",
                "من نزل منزلا فقال: أعوذ بكلمات الله التامات من شر ما خلق ، لم يضره شيء حتى يرتحل من منزله<br><br>الراوي: خولة بنت حكيم | المحدث: الألباني (صحيح الجامع)",
                "عن النبي ﷺ: أنه نهى أن يشرب الرجل قائما. قال قتادة: فقلنا: فالأكل، فقال: ذاك أشر، أو أخبث.<br><br>الراوي: أنس بن مالك | المحدث: مسلم (صحيح مسلم)",
                "كان رسول الله ﷺ يأكل بثلاث أصابع، ويلعق يده قبل أن يمسحها.<br><br>الراوي: كعب بن مالك | المحدث: مسلم (صحيح مسلم)",
                "خير ماء على وجه الأرض ماء زمزم ، فيه طعام من الطعم ، و شفاء من السقم ، و شر ماء على وجه الأرض ماء بوادي برهوت بقبة بحضرموت كرجل الجراد من الهوام ، تصبح تتدفق و تمسي لا بلال لها<br><br>الراوي: عبدالله بن عباس | المحدث: الألباني (صحيح الجامع)",
                "أن رسول الله ﷺ كان إذا رأى المطر، قال: اللهم صيبا نافعا .<br><br>الراوي: عائشة أم المؤمنين | المحدث: البخاري (صحيح البخاري)",
                "أن النبي ﷺ كان إذا هاجت ريح شديدة قال اللهم إني أسألك من خير ما أمرت به و أعوذ بك من شر ما أمرت به<br><br>الراوي: أنس بن مالك | المحدث: العيني (عمدة القاري)",
                "من عاد مريضا لم يزل في خرفة الجنة، قيل يا رسول الله، وما خرفة الجنة؟ قال: جناها.<br><br>الراوي: ثوبان مولى رسول الله ﷺ | المحدث: مسلم (صحيح مسلم)",
                "زار رجل أخا له في قرية فأرصد الله له ملكا على مدرجته ، فقال: أين تريد ؟ قال: أخا لي في هذه القرية ، فقال: هل له عليك من نعمة تربها ؟ قال: لا ؛ إلا أني أحبه في الله ، قال: فإني رسول الله إليك أن الله أحبك كما أحببته<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "إن لله تعالى تسعة و تسعين اسما مائة إلا واحدا ، من أحصاها دخل الجنة<br><br>الراوي: أبو هريرة وعمر بن الخطاب | المحدث: الألباني (صحيح الجامع)",
                "قال: النبي ﷺ كلمة وقلت أخرى، قال النبي ﷺ: من مات وهو يدعو من دون الله ندا دخل النار وقلت أنا: من مات وهو لا يدعو لله ندا دخل الجنة.<br><br>الراوي: عبدالله بن مسعود | المحدث: البخاري (صحيح البخاري)",
                "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه.<br><br>الراوي: عبدالله بن عمرو | المحدث: البخاري (صحيح البخاري)",
                "قال الله تعالى: أنا أغنى الشركاء عن الشرك ، من عمل عملا أشرك فيه معي تركته وشركه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "من حفظ عشر آيات من أول سورة الكهف عصم من الدجال.<br><br>الراوي: أبو الدرداء | المحدث: مسلم (صحيح مسلم)",
                "من نفس عن مسلم كربة من كرب الدنيا نفس الله عنه كربة من كرب يوم القيامة ، ومن يسر على معسر في الدنيا يسر الله عليه في الدنيا والآخرة ، ومن ستر على مسلم في الدنيا ستر الله عليه في الدنيا والآخرة ، والله في عون العبد ، ما كان العبد في عون أخيه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الترمذي)",
                "إن مما أدرك الناس من كلام النبوة الأولى: إذا لم تستحي فاصنع ما شئت<br><br>الراوي: أبو مسعود عقبة بن عمرو | المحدث: ابن عبدالبر (التمهيد)",
                "إذا دعوتم الله فاعزموا في الدعاء، ولا يقولن أحدكم إن شئت فأعطني، فإن الله لا مستكره له.<br><br>الراوي: أنس بن مالك | المحدث: البخاري (صحيح البخاري)",
                "من أحب لقاء الله أحب الله لقاءه ومن كره لقاء الله كره الله لقاءه قالت: فقلت: يا نبي الله كراهية الموت ؟ فكلنا نكره الموت قال: ( ليس كذلك ولكن المؤمن إذا بشر برحمة الله ورضوانه وجنته أحب لقاء الله وأحب الله لقاءه وإن الكافر إذا بشر بعذاب الله وسخطه كره لقاء الله وكره الله لقاءه<br><br>الراوي: عائشة أم المؤمنين | المحدث: ابن حبان (صحيح ابن حبان)",
                "إن الله قال: إذا تلقاني عبدي بشبر، تلقيته بذراع، وإذا تلقاني بذراع، تلقيته بباع، وإذا تلقاني بباع أتيته بأسرع.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "يقول الله تعالى: أنا عند ظن عبدي بي، وأنا معه إذا ذكرني، فإن ذكرني في نفسه ذكرته في نفسي، وإن ذكرني في ملإ ذكرته في ملإ خير منهم، وإن تقرب إلي بشبر تقربت إليه ذراعا، وإن تقرب إلي ذراعا تقربت إليه باعا، وإن أتاني يمشي أتيته هرولة.<br><br>الراوي: أبو هريرة | المحدث: البخاري (صحيح البخاري)",
                "كنا مع النبي ﷺ في سفر، فجعل الناس يجهرون بالتكبير، فقال النبي ﷺ: أيها الناس اربعوا على أنفسكم، إنكم ليس تدعون أصم ولا غائبا، إنكم تدعون سميعا قريبا، وهو معكم قال وأنا خلفه، وأنا أقول: لا حول ولا قوة إلا بالله، فقال يا عبد الله بن قيس: ألا أدلك على كنز من كنوز الجنة، فقلت: بلى، يا رسول الله، قال: قل: لا حول ولا قوة إلا بالله.<br><br>الراوي: أبو موسى الأشعري | المحدث: مسلم (صحيح مسلم)",
                "أن رسول الله ﷺ كان يقول عند الكرب: لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم، لا إله إلا الله رب السموات ورب الأرض، ورب العرش الكريم .<br><br>الراوي: عبدالله بن عباس | المحدث: البخاري (صحيح البخاري)",
                "والذي نفسي بيده، لو لم تذنبوا لذهب الله بكم، ولجاء بقوم يذنبون، فيستغفرون الله، فيغفر لهم.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "جعل الله الرحمة مائة جزء ، فأمسك عنده تسعة وتسعين جزءا ، وأنزل في الأرض جزءا واحدا ، فمن ذلك الجزء تتراحم الخلق حتى ترفع الفرس حافرها عن ولدها خشية أن تصيبه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "إن عبدا قتل تسعة وتسعين نفسا ثم عرضت له التوبة، فسأل عن أعلم أهل الأرض، فدل على رجل فأتاه فقال: إني قتلت تسعة وتسعين نفسا، فهل لي من توبة؟ قال: بعد تسعة وتسعين نفسا قال: فانتضى سيفه فقتله، فأكمل به المائة، ثم عرضت له التوبة، فسأل عن أعلم أهل الأرض، فدل على رجل فأتاه فقال: إني قتلت مائة نفس، فهل لي من توبة؟ فقال: ويحك، ومن يحول بينك وبين التوبة؟ اخرج من القرية الخبيثة التي أنت فيها إلى القرية الصالحة قرية كذا وكذا، فاعبد ربك فيها، فخرج يريد القرية الصالحة، فعرض له أجله في الطريق، فاختصمت فيه ملائكة الرحمة وملائكة العذاب، قال إبليس: أنا أولى به، إنه لم يعصني ساعة قط، قال: فقالت ملائكة الرحمة: إنه خرج تائبا<br><br>الراوي: أبو سعيد الخدري | المحدث: الألباني (صحيح ابن ماجه)",
                "من أشد أمتي لي حبا، ناس يكونون بعدي، يود أحدهم لو رآني بأهله وماله.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "الدجال أعور، عين اليسرى جفال الشعر، معه جنة ونار، فناره جنة، وجنته نار<br><br>الراوي: حذيفة بن اليمان | المحدث: الألباني (صحيح ابن ماجه)",
                "يقول العبد: مالي مالي ، وإن من ماله ثلاثا: ما أكل فأفنى ، أو لبس فأبلى ، أو أعطى فأقنى ، وما سوى ذلك ، فهو ذاهب وتاركه للناس<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "انظروا إلى من هو أسفل منكم ولا تنظروا إلى من هو فوقكم فإنه أجدر أن لا تزدروا نعمة الله<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح ابن ماجه)",
                "إن الله تعالى لا ينظر إلى صوركم وأموالكم ، ولكن إنما ينظر إلى قلوبكم وأعمالكم<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "يا أيها الناس توبوا إلى الله، فإني أتوب في اليوم إليه مئة مرة.<br><br>الراوي: الأغر المزني أبو مالك | المحدث: مسلم (صحيح مسلم)",
                "من تاب قبل أن تطلع الشمس من مغربها ، تاب الله عليه<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الجامع)",
                "من سأل الله الشهادة صادقا بلغه الله منازل الشهداء وإن مات على فراشه<br><br>الراوي: سهل بن حنيف | المحدث: الألباني (صحيح أبي داود)",
                "يبعث كل عبد على ما مات عليه.<br><br>الراوي: جابر بن عبدالله | المحدث: مسلم (صحيح مسلم)",
                "الدال على الخير كفاعله<br><br>الراوي: أبو مسعود عقبة بن عمرو | المحدث: الألباني (صحيح الترغيب)",
                "إن المسلم إذا أنفق على أهله نفقة، وهو يحتسبها، كانت له صدقة.<br><br>الراوي: أبو مسعود عقبة بن عمرو | المحدث: مسلم (صحيح مسلم)",
                "كل معروف صدقة.<br><br>الراوي: حذيفة بن اليمان | المحدث: مسلم (صحيح مسلم)",
                "أن النبي ﷺ كان إذا لم يصل أربعا قبل الظهر صلاهن بعده<br><br>الراوي: عائشة أم المؤمنين | المحدث المصدر): أحمد شاكر (تخريج سنن الترمذي)",
                "إذا أقيمت الصلاة فلا تقوموا حتى تروني<br><br>الراوي: أنس بن مالك | المحدث: أحمد شاكر (تخريج سنن الترمذي)",
                "كان النبي ﷺ إذا خرج يوم العيد في طريق رجع في غيره<br><br>الراوي: أبو هريرة | المحدث: أحمد شاكر (تخريج سنن الترمذي)",
                "يدخل الفقراء الجنة قبل الأغنياء بخمسمائة عام ، نصف يوم<br><br>الراوي: أبو هريرة | المحدث: الترمذي (سنن الترمذي)",
                "علموا الصبي الصلاة ابن سبع سنين واضربوه عليها ابن عشر<br><br>الراوي: سبرة بن معبد الجهني | المحدث: أحمد شاكر (تخريج سنن الترمذي)",
                "تيممنا مع رسول الله ﷺ بالتراب ، فمسحنا بوجوهنا وأيدينا إلى المناكب<br><br>الراوي: عمار بن ياسر | المحدث: الألباني (صحيح النسائي)",
                "التثاؤب في الصلاة من الشيطان ، فإذا تثاءب أحدكم فليكظم ما استطاع<br><br>الراوي: أبو هريرة | المحدث: الألباني (صحيح الترمذي)",
                "إنه خلق كل إنسان من بني آدم على ستين وثلاث مائة مفصل، فمن كبر الله، وحمد الله، وهلل الله، وسبح الله، واستغفر الله، وعزل حجرا عن طريق الناس، أو شوكة، أو عظما عن طريق الناس، وأمر بمعروف، أو نهى عن منكر، عدد تلك الستين والثلاث مائة السلامى -فإنه يمشي يومئذ وقد زحزح نفسه عن النار. <br><br> الراوي: عائشة أم المؤمنين | المحدث: مسلم (صحيح مسلم)",
                "على كل مسلم صدقة قيل: أرأيت إن لم يجد؟ قال: يعتمل بيديه فينفع نفسه ويتصدق قال، قيل: أرأيت إن لم يستطع؟ قال: يعين ذا الحاجة الملهوف قال: قيل له: أرأيت إن لم يستطع؟ قال: يأمر بالمعروف أو الخير قال: أرأيت إن لم يفعل؟ قال: يمسك عن الشر؛ فإنها صدقة.<br><br>الراوي: أبو موسى الأشعري | المحدث: مسلم (صحيح مسلم)",
                "من حمل علينا السلاح فليس منا، ومن غشنا فليس منا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "كل سلامى من الناس عليه صدقة، كل يوم تطلع فيه الشمس، يعدل بين الاثنين صدقة، ويعين الرجل على دابته فيحمل عليها، أو يرفع عليها متاعه صدقة، والكلمة الطيبة صدقة، وكل خطوة يخطوها إلى الصلاة صدقة، ويميط الأذى عن الطريق صدقة.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "ما من يوم يصبح العباد فيه إلا ملكان ينزلان، فيقول أحدهما: اللهم، أعط منفقا خلفا، ويقول الآخر: اللهم، أعط ممسكا تلفا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "تصدقوا، فيوشك الرجل يمشي بصدقته، فيقول الذي أعطيها: لو جئتنا بها بالأمس قبلتها، فأما الآن، فلا حاجة لي بها، فلا يجد من يقبلها.<br><br>الراوي: حارثة بن وهب الخزاعي | المحدث: مسلم (صحيح مسلم)",
                "تصدقوا فسيأتي على الناس زمان يمشي الرجل بصدقته، فلا يجد من يقبلها .<br><br>الراوي: حارثة بن وهب الخزاعي | المحدث: البخاري (صحيح البخاري)",
                "ليأتين على الناس زمان يطوف الرجل فيه بالصدقة من الذهب، ثم لا يجد أحدا يأخذها منه، ويرى الرجل الواحد يتبعه أربعون امرأة، يلذن به، من قلة الرجال وكثرة النساء. وفي رواية ابن براد وترى الرجل.<br><br>الراوي: أبو موسى الأشعري | المحدث: مسلم (صحيح مسلم)",
                "تقيء الأرض أفلاذ كبدها، أمثال الأسطوان من الذهب والفضة، فيجيء القاتل فيقول: في هذا قتلت، ويجيء القاطع فيقول: في هذا قطعت رحمي، ويجيء السارق فيقول: في هذا قطعت يدي، ثم يدعونه فلا يأخذون منه شيئا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "لا يتصدق أحد بتمرة من كسب طيب، إلا أخذها الله بيمينه، فيربيها كما يربي أحدكم فلوه، أو قلوصه، حتى تكون مثل الجبل، أو أعظم. في حديث روح من الكسب الطيب فيضعها في حقها. وفي حديث سليمان فيضعها في موضعها.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "أيها الناس، إن الله طيب لا يقبل إلا طيبا، وإن الله أمر المؤمنين بما أمر به المرسلين، فقال: {يا أيها الرسل كلوا من الطيبات واعملوا صالحا إني بما تعملون عليم} [المؤمنون: 51]، وقال: {يا أيها الذين آمنوا كلوا من طيبات ما رزقناكم} [البقرة: 172]، ثم ذكر الرجل يطيل السفر أشعث أغبر، يمد يديه إلى السماء، يا رب، يا رب، ومطعمه حرام، ومشربه حرام، وملبسه حرام، وغذي بالحرام، فأنى يستجاب لذلك؟!<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "ما منكم من أحد إلا سيكلمه الله، ليس بينه وبينه ترجمان، فينظر أيمن منه فلا يرى إلا ما قدم، وينظر أشأم منه فلا يرى إلا ما قدم، وينظر بين يديه فلا يرى إلا النار تلقاء وجهه، فاتقوا النار ولو بشق تمرة. زاد ابن حجر: قال الأعمش: وحدثني عمرو بن مرة، عن خيثمة مثله، وزاد فيه ولو بكلمة طيبة. وقال إسحاق: قال الأعمش: عن عمرو بن مرة، عن خيثمة.<br><br>الراوي: عدي بن حاتم الطائي | المحدث: مسلم (صحيح مسلم)",
                "من استطاع منكم أن يستتر من النار ولو بشق تمرة، فليفعل.<br><br>الراوي: عدي بن حاتم الطائي | المحدث: مسلم (صحيح مسلم)",
                "عن النبي ﷺ أنه نهى فذكر خصالا، وقال: من منح منيحة، غدت بصدقة، وراحت بصدقة، صبوحها وغبوقها.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "مثل البخيل والمتصدق مثل رجلين عليهما جنتان من حديد، إذا هم المتصدق بصدقة اتسعت عليه، حتى تعفي أثره، وإذا هم البخيل بصدقة تقلصت عليه، وانضمت يداه إلى تراقيه، وانقبضت كل حلقة إلى صاحبتها. قال: فسمعت رسول الله ﷺ يقول: فيجهد أن يوسعها فلا يستطيع.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "إذا أنفقت المرأة من طعام بيتها غير مفسدة، كان لها أجرها بما أنفقت، ولزوجها أجره بما كسب، وللخازن مثل ذلك، لا ينقص بعضهم أجر بعض شيئا.<br><br>الراوي: عائشة أم المؤمنين | المحدث: مسلم (صحيح مسلم)",
                "من أنفق زوجين في سبيل الله، دعاه خزنة الجنة، كل خزنة باب: أي فل، هلم فقال أبو بكر: يا رسول الله، ذلك الذي لا توى عليه، قال رسول الله ﷺ: إني لأرجو أن تكون منهم.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "من أصبح منكم اليوم صائما؟ قال أبو بكر رضي الله عنه: أنا، قال: فمن تبع منكم اليوم جنازة؟ قال أبو بكر رضي الله عنه: أنا، قال: فمن أطعم منكم اليوم مسكينا؟ قال أبو بكر رضي الله عنه: أنا، قال: فمن عاد منكم اليوم مريضا؟ قال أبو بكر رضي الله عنه: أنا، فقال رسول الله ﷺ: ما اجتمعن في امرئ، إلا دخل الجنة.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "قال لي رسول الله ﷺ: أنفقي، أو انضحي، أو انفحي، ولا تحصي، فيحصي الله عليك.<br><br>الراوي: أسماء بنت أبي بكر | المحدث: مسلم (صحيح مسلم)",
                "ليس منا من ضرب الخدود، أو شق الجيوب، أو دعا بدعوى الجاهلية. وفي رواية: وشق ودعا. بغير ألف.<br><br>الراوي: عبدالله بن مسعود | المحدث: مسلم (صحيح مسلم)",
                "يا نساء المسلمات، لا تحقرن جارة لجارتها، ولو فرسن شاة.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "سبعة يظلهم الله في ظله، يوم لا ظل إلا ظله: الإمام العادل، وشاب نشأ في عبادة ربه، ورجل قلبه معلق في المساجد، ورجلان تحابا في الله اجتمعا عليه وتفرقا عليه، ورجل طلبته امرأة ذات منصب وجمال، فقال: إني أخاف الله، ورجل تصدق، أخفى حتى لا تعلم شماله ما تنفق يمينه، ورجل ذكر الله خاليا ففاضت عيناه.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "أفضل الصدقة، أو خير الصدقة عن ظهر غنى، واليد العليا خير من اليد السفلى، وابدأ بمن تعول.<br><br>الراوي: حكيم بن حزام | المحدث: مسلم (صحيح مسلم)",
                "يا ابن آدم إنك أن تبذل الفضل خير لك، وأن تمسكه شر لك، ولا تلام على كفاف، وابدأ بمن تعول، واليد العليا خير من اليد السفلى.<br><br>الراوي: أبو أمامة الباهلي | المحدث: مسلم (صحيح مسلم)",
                "لا تزال طائفة من أمتي قائمة بأمر الله، لا يضرهم من خذلهم، أو خالفهم، حتى يأتي أمر الله وهم ظاهرون على الناس.<br><br>الراوي: معاوية بن أبي سفيان | المحدث: مسلم (صحيح مسلم)",
                "لا تلحفوا في المسألة، فوالله، لا يسألني أحد منكم شيئا، فتخرج له مسألته مني شيئا، وأنا له كاره، فيبارك له فيما أعطيته.<br><br>الراوي: معاوية بن أبي سفيان | المحدث: مسلم (صحيح مسلم)",
                "ليس المسكين بالذي ترده التمرة والتمرتان، ولا اللقمة واللقمتان، إنما المسكين المتعفف، اقرؤوا إن شئتم: {لا يسألون الناس إلحافا}[البقرة:273].<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "ما يزال الرجل يسأل الناس، حتى يأتي يوم القيامة وليس في وجهه مزعة لحم.<br><br>الراوي: عبدالله بن عمر | المحدث: مسلم (صحيح مسلم)",
                "من سأل الناس أموالهم تكثرا، فإنما يسأل جمرا فليستقل، أو ليستكثر.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "لأن يحتزم أحدكم حزمة من حطب، فيحملها على ظهره فيبيعها، خير له من أن يسأل رجلا، يعطيه، أو يمنعه.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "كنا عند رسول الله ﷺ، تسعة، أو ثمانية، أو سبعة، فقال: ألا تبايعون رسول الله؟ وكنا حديث عهد ببيعة، فقلنا: قد بايعناك يا رسول الله، ثم قال: ألا تبايعون رسول الله؟ فقلنا: قد بايعناك يا رسول الله، ثم قال: ألا تبايعون رسول الله؟ قال: فبسطنا أيدينا وقلنا: قد بايعناك يا رسول الله، فعلام نبايعك؟ قال: على أن تعبدوا الله ولا تشركوا به شيئا، والصلوات الخمس، وتطيعوا، (وأسر كلمة خفية)، ولا تسألوا الناس شيئا. فلقد رأيت بعض أولئك النفر يسقط سوط أحدهم، فما يسأل أحدا يناوله إياه.<br><br>الراوي: عوف بن مالك الأشجعي | المحدث: مسلم (صحيح مسلم)",
                "قلب الشيخ شاب على حب اثنتين: حب العيش، والمال.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "لو كان لابن آدم واد من ذهب، أحب أن له واديا آخر، ولن يملأ فاه إلا التراب، والله يتوب على من تاب.<br><br>الراوي: أنس بن مالك | المحدث: مسلم (صحيح مسلم)",
                "ليس الغنى عن كثرة العرض، ولكن الغنى غنى النفس.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "أخوف ما أخاف عليكم ما يخرج الله لكم من زهرة الدنيا قالوا: وما زهرة الدنيا؟ يا رسول الله، قال: بركات الأرض قالوا: يا رسول الله، وهل يأتي الخير بالشر؟ قال: لا يأتي الخير إلا بالخير، لا يأتي الخير إلا بالخير، لا يأتي الخير إلا بالخير، إن كل ما أنبت الربيع يقتل، أو يلم، إلا آكلة الخضر، فإنها تأكل، حتى إذا امتدت خاصرتاها استقبلت الشمس، ثم اجترت وبالت وثلطت، ثم عادت فأكلت، إن هذا المال خضرة حلوة، فمن أخذه بحقه، ووضعه في حقه، فنعم المعونة هو، ومن أخذه بغير حقه، كان كالذي يأكل ولا يشبع.<br><br>الراوي: أبو سعيد الخدري | المحدث: مسلم (صحيح مسلم)",
                "اللهم اجعل رزق آل محمد قوتا. وفي رواية عمرو: اللهم ارزق.[وفي رواية]: وقال: كفافا.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "ثلاثة لا يكلمهم الله يوم القيامة، ولا ينظر إليهم ولا يزكيهم ولهم عذاب أليم قال: فقرأها رسول الله ﷺ ثلاث مرار، قال أبو ذر: خابوا وخسروا، من هم يا رسول الله؟ قال: المسبل، والمنان، والمنفق سلعته بالحلف الكاذب.<br><br>الراوي: أبو ذر الغفاري | المحدث: مسلم (صحيح مسلم)",
                "يخرج في هذه الأمة، ولم يقل: منها، قوم تحقرون صلاتكم مع صلاتهم، فيقرؤون القرآن، لا يجاوز حلوقهم، أو حناجرهم، يمرقون من الدين مروق السهم من الرمية، فينظر الرامي إلى سهمه إلى نصله إلى رصافه، فيتمارى في الفوقة، هل علق بها من الدم شيء.<br><br>الراوي: أبو سعيد الخدري | المحدث: مسلم (صحيح مسلم)",
                "أن النبي ﷺ وجد تمرة، فقال: لولا أن تكون صدقة لأكلتها.<br><br>الراوي: أنس بن مالك | المحدث: مسلم (صحيح مسلم)",
                "إن هذه الصدقات إنما هي أوساخ الناس، وإنها لا تحل لمحمد، ولا لآل محمد وقال أيضا: ثم قال رسول الله ﷺ ادعوا لي محمية بن جزء، وهو رجل من بني أسد كان رسول الله ﷺ استعمله على الأخماس.<br><br>الراوي: عبدالمطلب بن ربيعة بن الحارث | المحدث: مسلم (صحيح مسلم)",
                "أن رسول الله ﷺ دخل عليها فقال: هل من طعام؟ قالت: لا، والله، يا رسول الله، ما عندنا طعام إلا عظم من شاة أعطيته مولاتي من الصدقة، فقال: قربيه، فقد بلغت محلها.<br><br>الراوي: جويرية بنت الحارث | المحدث: مسلم (صحيح مسلم)",
                " إذا جاء رمضان فتحت أبواب الجنة، وغلقت أبواب النار، وصفدت الشياطين.<br><br>الراوي: أبو هريرة | المحدث: مسلم (صحيح مسلم)",
                "عشرة من قريش في الجنة: أنا في الجنة، وأبو بكر في الجنة، وعمر في الجنة، وعثمان في الجنة، وعلي في الجنة، والزبير في الجنة، وطلحة في الجنة، وعبد الرحمن بن عوف في الجنة، وسعد بن أبي وقاص في الجنة. ثم سكت سعيد، فقالوا له: من العاشر؟ فقال سعيد: أنا <br><br> الراوي: سعيد بن زيد بن عمرو بن نفيل | المحدث (المصدر): شعيب الأرناووط (تخريج شرح السنة)"
            ],
            azkarList: [

            ],
            rokyaList: [
                "الرقية الشرعية كاملة من القرآن والسنة<br>الرقية الشرعية أسباب شرعية للعلاج والاستشفاء والشفاء من الله سبحانه وتعالى ولا يملك أحد من الخلق ضرا ولا نفعا ، ولذلك يجب اللجوء إلى الله سبحانه وتعالى دون سائر الخلق",
                "إرشادات عامة يجب أن تراعى عند الرقية الشرعية<br>* أن لا يعتقد الراقي أن الرقية تؤثر بذاتها بل بذات الله سبحانه وتعالى",
                "* كون الراقي والمرقي على طهارة تامة",
                "* استقبال الراقي القبلة",
                "* لزوم تدبر الراقي والمرقي لنصوص الرقية، فلا يقولها الراقي دون تفكر بمعانيها، ولا يستمعها المرقي إلا وقد اجتهد في تدبرها، واستحضر كلاهما الخشوع في أثناء الرقية بتعلق القلب بعظيم قدرة الله -تعالى- وحسن الاستعانة به سبحانه",
                "* بإمكان الراقي الاقتصار في الرقية على الآيات القرآنية أو التعوذات النبوية، لكن الأكمل في ذلك أن يجمع بينها",
                "* بإمكان الراقي أن يختار ما يناسب حسبما يتسع له وللمرقي الوقت، كما أن له الاختصار في الرقية، بحيث يختار منها ما يناسب حال المرقي، وللراقي كذلك قراءة الرقية على مراحل، بحيث يستريح المريض بينها",
                "* النفث - وهو نفخ لطيف مع بعض ريق - في أثناء القراءة وبعدها، ولا بأس بتركه",
                "* استحسان وضع اليد في أثناء القراءة على الناصية أو على موضع الألم، مع ملاحظة عدم جواز مس النساء من غير المحارم",
                "* إن لاحظ الراقي تأثر المريض ببعض الآيات في أثناء الرقية، فلا بأس بتكرارها ثلاثا، أو خمسا، أو سبع مرار، حسب الحاجة وملاحظة درجة الاستجابة",
                "* أن ينوي الراقي برقيته نفع أخيه، ومحبة أن يشفيه الله ويخفف عنه",
                "* إن تيقن الراقي وجود جني متلبس، حرص عندئذ على تخليص المرقي من ذلك التلبس، مع حرصه كذلك على دعوة ذلك الجني إلى التقوى والاستقامة، وهذا مطلب مهم جدا ينبغي للراقي ملاحظته؛ ذلك أن هم المسلم الأعظم الدعوة إلى الله -تعالى- لقول المولى - عز وجل -: ﴿ قل هذه سبيلي أدعو إلى الله على بصيرة أنا ومن اتبعني ﴾ [يوسف: 108]",
                "* أن يباشر رقيته وهو يحمل في صدره هاتين النيتين (الشفاء، ومحبة الهداية)، وليتنبه الراقي إلى أنه لا ينبغي له أن يسعى إلى أذية الجني ابتداء، إلا إذا استعصت عليه سبل هدايته، فكم من جني متلبس تاب وأناب على يد راق، بل كم من شيطان مارد أسلم على يديه، فكتب الله -تعالى- شفاء للمريض وهداية للجني",
                "* مراعاة لفظ الرقية المناسب للمقام عند القراءة فيقول: (أرقي نفسي)، (أرقيك) أو (أرقيك)، أو (أرقيكم)، وذلك بحسب الحال",
                "* قد تستمر الرقية لمدة أسبوع كامل، وربما كانت أقل من ذلك، أو أكثر، وذلك بحسب حال المريض ومدى استجابته للعلاج، حتى يتم الشفاء بإذن الله",
                "* إذا جزم الراقي بأن المرقي يعاني من سحر - والعياذ بالله - فإنه من المهم للغاية أن يركز في رقيته على الآيات التي ذكر فيها السحر، مع تكرار قراءتها على المسحور، وبخاصة المعوذتين، ففي ذلك تأثير بالغ على فك السحر، ودفع الأذى، بإذن الله",
                "* إن للراقي القراءة جهرا أو سرا، والجهر أولى، وذلك بصوت معتدل يتمكن معه المرقي من سماعه؛ فيزداد بذلك تأثره بالرقية وانتفاعه بها",
                "الرقية الشرعية من القرآن الكريم<br>* بسم الله الرحمن الرحيم ﴿1﴾ الحمد لله رب العالمين ﴿2﴾ الرحمن الرحيم ﴿3﴾ مالك يوم الدين ﴿4﴾ إياك نعبد وإياك نستعين ﴿5﴾ اهدنا الصراط المستقيم ﴿6﴾ صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين ﴿7﴾. [الفاتحة: 1-7]",
                "* الم ﴿1﴾ ذلك الكتاب لا ريب فيه هدى للمتقين ﴿2﴾ الذين يؤمنون بالغيب ويقيمون الصلاة ومما رزقناهم ينفقون ﴿3﴾ والذين يؤمنون بما أنزل إليك وما أنزل من قبلك وبالآخرة هم يوقنون ﴿4﴾ أولئك على هدى من ربهم وأولئك هم المفلحون ﴿5﴾. [البقرة: 1-5]",
                "* الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم له ما في السماوات وما في الأرض من ذا الذي يشفع عنده إلا بإذنه يعلم ما بين أيديهم وما خلفهم ولا يحيطون بشيء من علمه إلا بما شاء وسع كرسيه السماوات والأرض ولا يؤوده حفظهما وهو العلي العظيم. [آية الكرسى - البقرة 255]",
                "* لله ما في السماوات وما في الأرض وإن تبدوا ما في أنفسكم أو تخفوه يحاسبكم به الله فيغفر لمن يشاء ويعذب من يشاء والله على كل شيء قدير ﴿284﴾ آمن الرسول بما أنزل إليه من ربه والمؤمنون كل آمن بالله وملائكته وكتبه ورسله لا نفرق بين أحد من رسله وقالوا سمعنا وأطعنا غفرانك ربنا وإليك المصير ﴿285﴾ لا يكلف الله نفسا إلا وسعها لها ما كسبت وعليها ما اكتسبت ربنا لا تؤاخذنا إن نسينا أو أخطأنا ربنا ولا تحمل علينا إصرا كما حملته على الذين من قبلنا ربنا ولا تحملنا ما لا طاقة لنا به واعف عنا واغفر لنا وارحمنا أنت مولانا فانصرنا على القوم الكافرين ﴿286﴾. [البقرة: 284-286]",
                "* قل يا أيها الكافرون ﴿1﴾ لا أعبد ما تعبدون ﴿2﴾ ولا أنتم عابدون ما أعبد ﴿3﴾ ولا أنا عابد ما عبدتم ﴿4﴾ ولا أنتم عابدون ما أعبد ﴿5﴾ لكم دينكم ولي دين ﴿6﴾. [الكافرون]",
                "* قل هو الله أحد ﴿1﴾ الله الصمد ﴿2﴾ لم يلد ولم يولد ﴿3﴾ ولم يكن له كفوا أحد ﴿4﴾. [الإخلاص]",
                "* قل أعوذ برب الفلق ﴿1﴾ من شر ما خلق ﴿2﴾ ومن شر غاسق إذا وقب ﴿3﴾ ومن شر النفاثات في العقد ﴿4﴾ ومن شر حاسد إذا حسد ﴿5﴾. [الفلق]",
                "* قل أعوذ برب الناس ﴿1﴾ ملك الناس ﴿2﴾ إله الناس ﴿3﴾ من شر الوسواس الخناس ﴿4﴾ الذي يوسوس في صدور الناس ﴿5﴾ من الجنة والناس ﴿6﴾. [الناس]",
                "الرقية الشرعية من السنة النبوية<br>* أعوذ بالله العظيم، وبوجهه الكريم، وسلطانه القديم، من الشيطان الرجيم",
                "* أعوذ بالله من الشيطان الرجيم، من همزه ونفخه ونفثه",
                "* أعوذ بكلمات الله التامة ، من كل شيطان وهامة ، ومن كل عين لامة",
                "* أعوذ بكلمات الله التامات من شر ما خلق",
                "* بسم الله أرقيك، من كل شيء يؤذيك، من شر كل نفس أو عين حاسد، الله يشفيك، بسم الله أرقيك",
                "* بسم الله (ثلاثا)، أعوذ بالله وقدرته من شر ما أجد وأحاذر (سبع مرات)",
                "* أسأل الله العظيم رب العرش العظيم، أن يعافيك ويشفيك",
                "* اللهم رب الناس، أذهب البأس، واشف، أنت الشافي لا شفاء إلا شفاؤك، شفاء لا يغادر سقما",
                "* اللهم اشف عبدك، وصدق رسولك",
                "* اللهم بارك عليه، وأذهب عنه حر العين وبردها ووصبها",
                "* اللهم إنا نسألك من خير ما سألك منه نبيك محمد ﷺ ونعوذ بك من شر ما استعاذ منه نبيك محمد ﷺ وأنت المستعان، وعليك البلاغ، ولا حول ولا قوة إلا بالله",
                "* لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش الكريم، لا إله إلا الله رب السماوات ورب العرش العظيم",
                "* ربنا الله الذي في السماء، تقدس اسمك، أمرك في السماء والأرض، كما رحمتك في السماء فاجعل رحمتك في الأرض، اغفر لنا حوبنا وخطايانا، أنت رب الطيبين، أنزل رحمة من رحمتك، وشفاء من شفائك على هذا الوجع، فيبرأ. (ثلاث مرات)",
                "* أعوذ بوجه الله الكريم، وبكلمات الله التامات، اللاتي لا يجاوزهن بر ولا فاجر، من شر ما ينزل من السماء وشر ما يعرج فيها، وشر ما ذرأ في الأرض وشر ما يخرج منها، ومن فتن الليل والنهار، ومن طوارق الليل والنهار، إلا طارقا يطرق بخير يا رحمن ",
                "* بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (ثلاث مرات)",
                "* أعوذ بكلمات الله التامة من غضبه وعقابه ، وشر عباده ، ومن همزات الشياطين ، وأن يحضرون",
                "* بسم الله العظيم ، أعوذ بالله الكبير من شر كل عرق نعار ، ومن شر حر النار",
                "* بسم الله تربة أرضنا، بريقة بعضنا، يشفى سقيمنا، بإذن ربنا",
                "* اللهم إني أسألك بأن لك الحمد لا إله إلا أنت، المنان يا بديع السماوات والأرض، يا ذا الجلال والإكرام، يا حي يا قيوم",
                "* اللهم إني أسألك بأني أشهد أنك أنت الله لا إله إلا أنت، الأحد، الصمد، الذي لم يلد، ولم يولد، ولم يكن له كفوا أحد",
                "* أسأل الله العظيم رب العرش العظيم، أن يعافيك ويشفيك. (سبع مرات)",
                "* اللهم برد قلبي بالثلج والبرد والماء البارد ، اللهم نق قلبي من الخطايا كما نقيت الثوب الأبيض من الدنس",
                "* اللهم إني أعوذ بوجهك الكريم وكلماتك التامة من شر ما أنت آخذ بناصيته، اللهم أنت تكشف المغرم والمأثم، اللهم لا يهزم جندك، ولا يخلف وعدك، ولا ينفع ذا الجد منك الجد، سبحانك وبحمدك",
                "* باسم الله يبريك، ومن كل داء يشفيك، ومن شر حاسد إذا حسد، وشر كل ذي عين",
                "* اللهم اشف عبدك ينكأ لك عدوا ، أو يمشي لك إلى صلاة",
                "* اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد، اللهم بارك على محمد وعلى آل محمد كما باركت على إبراهيم وعلى آل إبراهيم في العالمين إنك حميد مجيد"
            ],
            fadilList: [

            ],
            allahNamesList: [
                "ٱلله:<br><br>وهو الاسم الأعظم الذي تفرد به الحق سبحانه وخص به نفسه وجعله أول أسمائه، وأضافها كلها إليه فهو علم على ذاته سبحانه.",
                "ٱلرحمن:<br><br>كثير الرحمة وهو اسم مقصور على الله عز وجل ولا يجوز أن يقال رحمن لغير الله، وذلك لأن رحمته وسعت كل شيء وهو أرحم الراحمين.",
                "ٱلرحيم:<br><br>هو المنعم أبدا، المتفضل دوما، فرحمته لا تنتهي.",
                "ٱلملك:<br><br>هو الله، ملك الملوك، له الملك، وهو مالك يوم الدين، ومليك الخلق فهو المالك المطلق.",
                "ٱلقدوس:<br><br>هو الطاهر المنزه عن العيوب والنقائص وعن كل ما تحيط به العقول.",
                "ٱلسلام:<br><br>هو ناشر السلام بين الأنام وهو الذي سلمت ذاته من النقص والعيب والفناء.",
                "ٱلمؤمن:<br><br>هو الذي سلم أوليائه من عذابه، والذي يصدق عباده ما وعدهم.",
                "ٱلمهيمن:<br><br>هو الرقيب الحافظ لكل شيء، القائم على خلقه بأعمالهم، وأرزاقهم وآجالهم، المتعهد لهم بالرعاية والوقاية والصيانة",
                "ٱلعزيز:<br><br>هو المنفرد بالعزة، الظاهر الذي لا يقهر، القوي الممتنع فلا يغلبه شيء وهو غالب كل شيء.",
                "ٱلجبار:<br><br>هو الذي تنفذ مشيئته، ولا يخرج أحد عن تقديره، وهو القاهر لخلقه على ما أراد.",
                "ٱلمتكبر:<br><br>هو المتعالى عن صفات الخلق المنفرد بالعظمة والكبرياء.",
                "ٱلخالق:<br><br>هو الفاطر المبدع لكل شيء، والمقدر له والموجد للأشياء من العدم، فهو خالق كل صانع وصنعته.",
                "ٱلبارئ:<br><br>هو الذي خلق الخلق بقدرته لا عن مثال سابق، القادر على إبراز ما قدره إلى الوجود.",
                "ٱلمصور:<br><br>هو الذي صور جميع الموجودات، ورتبها فأعطى كل شيء منها صورة خاصة، وهيئة منفردة، يتميز بها على اختلافها وكثرتها.",
                "ٱلغفار:<br><br>هو وحده الذي يغفر الذنوب ويستر العيوب في الدنيا والآخرة.",
                "ٱلقهار:<br><br>هو الغالب الذي قهر خلقه بسلطانه وقدرته، وصرفهم على ما أراد طوعا وكرها، وخضع لجلاله كل شيء.",
                "ٱلوهاب:<br><br>هو المنعم على العباد، الذي يهب بغير عوض ويعطي الحاجة بغير سؤال، كثير النعم، دائم العطاء.",
                "ٱلرزاق:<br><br>هو الذي خلق الأرزاق وأعطى كل الخلائق أرزاقها، ويمد كل كائن لما يحتاجه، ويحفظ عليه حياته ويصلحه.",
                "ٱلفتاح:<br><br>هو الذي يفتح مغلق الأمور، ويسهل العسير، وبيده مفاتيح السماوات والأرض.",
                "ٱلعليم:<br><br>هو الذي يعلم تفاصيل الأمور، ودقائق الأشياء وخفايا الضمائر، والنفوس، لا يغرب عن ملكه مثقال ذرة، فعلمه يحيط بجميع الأشياء.",
                "ٱلقابض ٱلباسط:<br><br>هو الذي يقبض الرزق عمن يشاء من الخلق بعدله، والذي يوسع الرزق لمن يشاء من عباده بجوده ورحمته فهو سبحانه القابض الباسط.",
                "ٱلخافض ٱلرافع:<br><br>هو الذي يخفض الأذلال لكل من طغى وتجبر وخرج على شريعته وتمرد، وهو الذي يرفع عباده المؤمنين بالطاعات وهو رافع السماوات.",
                "ٱلمعز ٱلمذل:<br><br>هو الذي يهب القوة والغلبة والشدة لمن شاء فيعزه، وينزعها عمن يشاء فيذله.",
                "ٱلسميع:<br><br>هو الذي لا يخفى عليه شيء في الأرض ولا في السماء وهو السميع البصير.",
                "ٱلبصير:<br><br>هو الذي يرى الأشياء كلها ظاهرها وباطنها وهو المحيط بكل شيء علما.",
                "ٱلحكم:<br><br>هو الذي يفصل بين مخلوقاته بما شاء ويفصل بين الحق والباطل لا راد لقضائه ولا معقب لحكمه.",
                "ٱلعدل:<br><br>هو الذي حرم الظلم على نفسه، وجعله على عباده محرما، فهو المنزه عن الظلم والجور في أحكامه وأفعاله الذي يعطي كل ذي حق حقه.",
                "ٱللطيف:<br><br>هو البر الرفيق بعباده، يرزق وييسر ويحسن إليهم، ويرفق بهم ويتفضل عليهم.",
                "ٱلخبير:<br><br>هو العليم بدقائق الأمور، لا تخفى عليه خافية، ولا يغيب عن علمه شيء فهو العالم بما كان ويكون.",
                "ٱلحليم:<br><br>هو الصبور الذي يمهل ولا يهمل، ويستر الذنوب، ويؤخر العقوبة، فيرزق العاصي كما يرزق المطيع.",
                "ٱلعظيم:<br><br>هو الذي ليس لعظمته بداية ولا لجلاله نهاية، وليس كمثله شيء.",
                "ٱلغفور:<br><br>هو الساتر لذنوب عباده المتجاوز عن خطاياهم وذنوبهم.",
                "ٱلشكور:<br><br>هو الذي يزكو عنده القليل من أعمال العباد، فيضاعف لهم الجزاء، وشكره لعباده مغفرته لهم.",
                "ٱلعلي:<br><br>هو الرفيع القدر فلا يحيط به وصف الواصفين المتعالي عن الأنداد والأضداد، فكل معاني العلو ثابتة له ذاتا وقهرا وشأنا.",
                "ٱلكبير:<br><br>هو العظيم الجليل ذو الكبرياء في صفاته وأفعاله فلا يحتاج إلى شيء ولا يعجزه شيء (ليس كمثله شيء).",
                "ٱلحفيظ:<br><br>هو الذي لا يغرب عن حفظه شيء ولو كمثقال الذر فحفظه لا يتبدل ولا يزول ولا يعتريه التبديل.",
                "المقيت:<br><br>هو المتكفل بإيصال أقوات الخلق إليهم وهو الحفيظ والمقتدر والقدير والمقدر والممدد.",
                "ٱلحسيب:<br><br>هو الكافي الذي منه كفاية العباد وهو الذي عليه الإعتماد يكفي العباد بفضله.",
                "الجليل:<br><br>هو العظيم المطلق المتصف بجميع صفات الكمال والمنعوت بكمالها المنزه عن كل نقص.",
                "ٱلكريم:<br><br>هو الكثير الخير الجواد المعطي الذي لا ينفذ عطاؤه وهو الكريم المطلق الجامع لأنواع الخير والشرف والفضائل المحمود بفعاله.",
                "ٱلرقيب:<br><br>هو الرقيب الذي يراقب أحوال العباد ويعلم أقوالهم ويحصي أعمالهم وهو الحافظ الذي لا يغيب عنه شيء.",
                "ٱلمجيب:<br><br>هو الذي يجيب دعاء من دعاه، وسؤال من سأله، ويقابله بالعطاء والقبول، ولا يسأل أحد سواه.",
                "ٱلواسع:<br><br>هو الذي وسع رزقه جميع خلقه، وسعت رحمته كل شيء المحيط بكل شيء.",
                "ٱلحكيم:<br><br>هو المحق في تدبيره اللطيف في تقديره الخبير بحقائق الأمور العليم بحكمه المقدور فجميع خلقه وقضاه خير وحكمة وعدل.",
                "ٱلودود:<br><br>هو المحب لعباده، والمحبوب في قلوب أوليائه.",
                "ٱلمجيد:<br><br>هو البالغ النهاية في المجد، الكثير الإحسان الجزيل العطاء العظيم البر.",
                "الباعث:<br><br>هو باعث الخلق يوم القيامة، وباعث رسله إلى العباد، وباعث المعونة إلى العبد.",
                "ٱلشهيد:<br><br>هو الحاضر الذي لا يغيب عنه شيء، فهو المطلع على كل شيء مشاهد له عليم بتفاصيله.",
                "ٱلحق:<br><br>هو الذي يحق الحق بكلماته ويؤيد أولياءه فهو المستحق للعبادة.",
                "ٱلوكيل:<br><br>هو الكفيل بالخلق القائم بأمورهم فمن توكل عليه تولاه وكفاه، ومن استغنى به أغناه وأرضاه.",
                "ٱلقوي:<br><br>هو صاحب القدرة التامة البالغة الكمال غالب لا يغلب فقوته فوق كل قوة.",
                "ٱلمتين:<br><br>هو الشديد الذي لا يحتاج في إمضاء حكمه إلى جند أو مدد ولا إلى معين.",
                "ٱلولي:<br><br> هو المحب الناصر لمن أطاعه، ينصر أولياءه، ويقهر أعداءه، والمتولي الأمور الخلائق ويحفظهم.",
                "ٱلحميد:<br><br>هو المستحق للحمد والثناء، الذي لا يحمد على مكروه سواه.",
                "ٱلمحصي:<br><br>هو الذي أحصى كل شيء بعلمه، فلا يفوته منها دقيق ولا جليل.",
                "ٱلمبدئ:<br><br>هو الذي أنشأ الأشياء، واخترعها ابتداء من غير سابق مثال.",
                "ٱلمعيد:<br><br>هو الذي يعيد الخلق بعد الحياة إلى الممات في الدنيا، وبعد الممات إلى الحياة يوم القيامة.",
                "المحيي:<br><br>هو خالق الحياة ومعطيها لمن شاء، يحيي الخلق من العدم ثم يحييهم بعد الموت.",
                "ٱلمميت:<br><br>هو مقدر الموت على كل من أماته ولا مميت سواه، قهر عباده بالموت متى شاء وكيف شاء.",
                "ٱلحي:<br><br>هو المتصف بالحياة الأبدية التي لا بداية لها ولا نهاية فهو الباقي أزلا وأبدا وهو الحي الذي لا يموت.",
                "ٱلقيوم:<br><br>هو القائم بنفسه، الغني عن غيره، وهو القائم بتدبير أمر خلقه في إنشائهم ورزقهم.",
                "ٱلواجد:<br><br>هو الذي لا يعوزه شيء ولا يعجزه شيء يجد كل ما يطلبه، ويدرك كل ما يريده.",
                "ٱلماجد:<br><br>هو الذي له الكمال المتناهي والعز الباهي، له العز في الأوصاف والأفعال الذي يعامل العباد بالجود والرحمة.",
                "ٱلواحد:<br><br>هو الفرد المتفرد في ذاته وصفائه وأفعاله، واحد في ملكه لا ينازعه أحد، لا شريك له سبحانه.",
                "ٱلصمد:<br><br>هو المطاع الذي لا يقضى دونه أمر، الذي يقصد إليه في الحوائج فهو مقصد عباده في مهمات دينهم ودنياهم.",
                "ٱلقادر:<br><br>هو الذي يقدر على إيجاد المعدوم وإعدام الموجود على قدر ما تقتضي الحكمة، لا زائدا عليه ولا ناقصا عنه.",
                "ٱلمقتدر:<br><br>هو الذي يقدر على إصلاح الخلائق على وجه لا يقدر عليه غيره.",
                "ٱلمقدم:<br><br>هو الذي يقدم الأشياء ويضعها في مواضعها، فمن استحق التقديم قدمه.",
                "ٱلمؤخر:<br><br>هو الذي يؤخر الأشياء فيضعها في مواضعها المؤخر لمن شاء من الفجار والكفار وكل من يستحق التأخير.",
                "ٱلأول:<br><br>هو الذي لم يسبقه في الوجود شيء فهو أول قبل الوجود.",
                "ٱلآخر:<br><br>هو الباقي بعد فناء خلقه، البقاء الأبدي يفنى الكل وله البقاء وحده، فليس بعده شيء.",
                "ٱلظاهر:<br><br>هو الذي ظهر فوق كل شيء وعلا عليه، الظاهر وجوده لكثرة دلائله.",
                "ٱلباطن:<br><br>هو العالم ببواطن الأمور وخفاياها، وهو أقرب إلينا من حبل الوريد.",
                "ٱلوالي:<br><br>هو المالك للأشياء المتصرف فيها بمشيئته وحكمته، ينفذ فيها أمره، ويجري عليها حكمه.",
                "ٱلمتعالي:<br><br>هو الذي جل عن إفك المفترين، وتنزه عن وساوس المتحيرين.",
                "ٱلبر:<br><br>هو العطوف على عباده ببره ولطفه، ومن على السائلين بحسن عطائه، وهو الصدق فيما وعد.",
                "ٱلتواب:<br><br>هو الذي يوفق عباده للتوبة حتى يتوب عليهم ويقبل توبتهم فيقابل الدعاء بالعطاء، والتوبة بغفران الذنوب.",
                "ٱلمنتقم:<br><br>هو الذي يقسم ظهور الطغاة، ويشدد العقوبة على العصاة، وذلك بعد الإعذار والإنذار.",
                "العفو:<br><br>هو الذي يترك المؤاخدة على الذنوب ولا يذكرك بالعيوب فهو يمحو السيئات ويتجاوز عن المعاصي.",
                "ٱلرؤوف:<br><br>هو المتعطف على المذنبين بالتوبة، الذي جاد بلطفه ومن بتعطفه، يستر العيوب ثم يعفو عنها.",
                "مالك ٱلملك:<br><br>هو المتصرف في ملكه كيف يشاء لا راد لحكمه، ولا معقب لأمره.",
                "ذو ٱلجلال وٱلإكرام:<br><br>هو المنفرد بصفات الجلال والكمال والعظمة، المختص بالإكرام والكرامة وهو أهل لأن يجل.",
                "ٱلمقسط:<br><br>هو العادل في حكمه، الذي ينتصف للمظلوم من الظالم، ثم يكمل عدله فيرضي الظالم بعد إرضاء المظلوم.",
                "ٱلجامع:<br><br>هو الذي جمع الكمالات كلها، ذاتا ووصفا وفعلا، الذي يجمع بين الخلائق المتماثلة والمتباينة، والذي يجمع الأولين والآخرين.",
                "ٱلغني:<br><br>هو الذي لا يحتاج إلى شيء، وهو المستغني عن كل ما سواه، المفتقر إليه كل من عاداه.",
                "ٱلمغني:<br><br>هو معطي الغنى لعباده، يغني من يشاء غناه، وهو الكافي لمن شاء من عباده.",
                "ٱلمعطي ٱلمانع:<br><br>هو الذي أعطى كل شيء، ويمنع العطاء عن من يشاء ابتلاء أو حماية.",
                "ٱلضار ٱلنافع:<br><br>هو المقدر للضر على من أراد كيف أراد، والمقدر النفع والخير لمن أراد كيف أراد كل ذلك على مقتضى حكمته سبحانه.",
                "ٱلنور:<br><br>هو الهادي الرشيد الذي يرشد بهدايته من يشاء فيبين له الحق، ويلهمه اتباعه، الظاهر في ذاته، المظهر لغيره.",
                "ٱلهادي:<br><br>هو المبين للخلق طريق الحق بكلامه يهدي القلوب إلى معرفته، والنفوس إلى طاعته.",
                "ٱلبديع:<br><br>هو الذي لا يماثله أحد في صفاته ولا في حكم من أحكامه، أو أمر من أموره، فهو المحدث الموجد على غير مثال.",
                "ٱلباقي:<br><br>هو وحده له البقاء، الدائم الوجود الموصوف بالبقاء الأزلي، غير قابل للفناء فهو الباقي بلا انتهاء.",
                "ٱلوارث:<br><br>هو الأبقى الدائم الذي يرث الخلائق بعد فناء الخلق، وهو يرث الأرض ومن عليها.",
                "ٱلرشيد:<br><br>هو الذي أسعد من شاء بإرشاده، وأشقى من شاء بإبعاده، عظيم الحكمة بالغ الرشاد.",
                "ٱلصبور:<br><br>هو الحليم الذي لا يعاجل العصاة بالنقمة، بل يعفوا ويؤخر، ولا يسرع بالفعل قبل أوانه."
            ],
            prophetNamesList: [
                "مُحَمَّد<br><br>المحمود في السماوات والأرض<br>﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ﴾ [آل عمران:144]",
                "أَحْمَد<br><br>أكثر حمداً لله (صيغة تفضيل)<br>﴿اسْمُهُ أَحْمَدُ﴾ [الصف:6]",
                "الرَّسُول<br><br>المبعوث من الله بالوحي<br>ذكر في 18 موضعاً بالقرآن",
                "النَّبِيُّ<br><br>المُنْبَأ بالوحي من الله<br>ذكر في 43 موضعاً بالقرآن",
                "خَاتَمُ النَّبِيِّينَ<br><br>آخر الأنبياء<br>﴿وَخَاتَمَ النَّبِيِّينَ﴾ [الأحزاب:40]",
                "العَبْد<br><br>عبد الله المطيع<br>﴿عَبْدَ اللَّهِ﴾ [الجن:19]",
                "المُزَّمِّل<br><br>المتغطي بثيابه عند الوحي<br>سورة المزمل",
                "المُدَّثِّر<br><br>المتدثر بثيابه<br>سورة المدثر",
                "الشَّاهِدُ<br><br>الشاهد على أمته<br>﴿وَيَكُونَ الرَّسُولُ عَلَيْكُمْ شَهِيدًا﴾ [البقرة:143]",
                "المُبِينُ<br><br>الواضح في دعوته<br>﴿قَدْ جَاءَكُمْ بَصَائِرُ مِنْ رَبِّكُمْ﴾ [الأنعام:104]",
                "المَاحِي<br><br>الذي يمحو الله به الكفر<br>حديث جبير بن مطعم (متفق عليه)",
                "الحَاشِرُ<br><br>الذي يُحشر الناس خلفه<br>حديث جبير بن مطعم (متفق عليه)",
                "العَاقِبُ<br><br>الذي لا نبي بعده<br>حديث أبي هريرة (صحيح مسلم)",
                "المُقَفِّي<br><br>الذي يتبع الأنبياء قبله<br>حديث أبي موسى الأشعري (صحيح مسلم)",
                "نَبِيُّ التَّوْبَةِ<br><br>الذي فتح الله به باب التوبة<br>حديث أبي موسى الأشعري (صحيح مسلم)",
                "نَبِيُّ الرَّحْمَةِ<br><br>الذي أرسله الله رحمة للعالمين<br>حديث أبي موسى الأشعري (صحيح مسلم)",
                "المُتَوَكِّلُ<br><br>الذي يعتمد على الله في كل أموره<br>حديث عبدالله بن عمرو (صحيح البخاري)",
                "الفَاتِحُ<br><br>الذي فتح الله به القلوب والبلاد<br>حديث أنس بن مالك (صحيح الجامع)",
                "القَاسِمُ<br><br>الذي يقسم بين الناس بالعدل<br>حديث جابر (صحيح البخاري)",
                "الأُمِّيُّ<br><br>الذي لا يقرأ ولا يكتب (معجزة)<br>﴿النَّبِيَّ الأُمِّيَّ﴾ [الأحزاب:46]",
                "الرَّءُوفُ الرَّحِيمُ<br><br>شديد الرحمة بالمؤمنين<br>﴿بِالْمُؤْمِنِينَ رَءُوفٌ رَّحِيمٌ﴾ [التوبة:128]",
                "السِّرَاجُ المُنِيرُ<br><br>المصباح الوهاج الهادي<br>﴿وَسِرَاجًا مُّنِيرًا﴾ [الأحزاب:46]",
                "الدَّاعِي إِلَى اللَّهِ<br><br>الداعي لعبادة الله وحده<br>﴿وَدَاعِيًا إِلَى اللَّهِ﴾ [الأحزاب:46]"
            ],
            doaaList: [
                "\"ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار\". [البقرة - 201]",
                "\"ربنا أفرغ علينا صبرا وثبت أقدامنا وانصرنا على القوم الكافرين\". [البقرة - 250]",
                "\"ربنا لا تؤاخذنا إن نسينا أو أخطأنا ربنا ولا تحمل علينا إصرا كما حملته على الذين من قبلنا ربنا ولا تحملنا ما لا طاقة لنا به واعف عنا واغفر لنا وارحمنا أنت مولانا فانصرنا على القوم الكافرين\". [البقرة - 286]",
                "\"ربنا لا تزغ قلوبنا بعد إذ هديتنا وهب لنا من لدنك رحمة إنك أنت الوهاب\". [آل عمران - 8]",
                "\"ربنا إننا آمنا فاغفر لنا ذنوبنا وقنا عذاب النار\". [آل عمران - 16]",
                "\"رب هب لي من لدنك ذرية طيبة إنك سميع الدعاء\". [آل عمران - 38]",
                "\"ربنا آمنا بما أنزلت واتبعنا الرسول فاكتبنا مع الشاهدين\". [آل عمران - 53]",
                "\"ربنا اغفر لنا ذنوبنا وإسرافنا في أمرنا وثبت أقدامنا وانصرنا على القوم الكافرين\". [آل عمران - 147]",
                "\"ربنا ما خلقت هذا باطلا سبحانك فقنا عذاب النار ربنا إنك من تدخل النار فقد أخزيته وما للظالمين من أنصار ربنا إننا سمعنا مناديا ينادي للإيمان أن آمنوا بربكم فآمنا ربنا فاغفر لنا ذنوبنا وكفر عنا سيئاتنا وتوفنا مع الأبرار ربنا وآتنا ما وعدتنا على رسلك ولا تخزنا يوم القيامة إنك لا تخلف الميعاد\". [آل عمران -  191-194]",
                "\"ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين\". [الأعراف - 23]",
                "\"ربنا لا تجعلنا مع القوم الظالمين\". [الأعراف - 47]",
                "\"ربنا أفرغ علينا صبرا وتوفنا مسلمين\". [الأعراف - 126]",
                "\"حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم\". [التوبة - 129]",
                "\"ربنا لا تجعلنا فتنة للقوم الظالمين ونجنا برحمتك من القوم الكافرين\". [يونس - 85-86]",
                "\"رب إني أعوذ بك أن أسألك ما ليس لي به علم وإلا تغفر لي وترحمني أكن من الخاسرين\". [هود - 47]",
                "\"رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء\". [إبرهيم - 40]",
                "\"ربنا اغفر لي ولوالدي وللمؤمنين يوم يقوم الحساب\". [إبرهيم - 41]",
                "\"رب أدخلني مدخل صدق وأخرجني مخرج صدق واجعل لي من لدنك سلطانا نصيرا\". [الإسراء - 80]",
                "\"ربنا آتنا من لدنك رحمة وهيئ لنا من أمرنا رشدا\". [الكهف - 10]",
                "\"رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقهوا قولي\". [طه - 25-28]",
                "\"رب زدني علما\". [طه - 114]",
                "\"لا إله إلا أنت سبحانك إني كنت من الظالمين\". [الأنبياء - 87]",
                "\"رب لا تذرني فردا وأنت خير الوارثين\". [الأنبياء - 89]",
                "\"رب أعوذ بك من همزات الشياطين وأعوذ بك رب أن يحضرون\". [المؤمنون - 97-98]",
                "\"ربنا آمنا فاغفر لنا وارحمنا وأنت خير الراحمين\". [المؤمنون - 109]",
                "\"رب اغفر وارحم وأنت خير الراحمين\". [المؤمنون - 118]"
            ],
            menList: [
                "أبو بكر الصديق رضي الله عنه",
                "عمر بن الخطاب رضي الله عنه",
                "عثمان بن عفان رضي الله عنه"
            ],
            womenList: [
                "حفل التاريخ الإسلامي بذكر عدد من النساء اللاني تركن بصماتهن بأعمالهن العظيمة, ومواقفهن المشهودة، ,من بين من ذكرهن التاريخ الإسلامي نساء مسلمات كن رائدات فيما تميزن به من الأعمال, ومن بين تلك النساء سنذكر بعضهن",
                "۞ رفيدة الأسلمية ۞<br><br>كانت الصحابية الجليل رفيدة الأسلمية مثالا في البذل والعطاء وخدمة المجتمع، فلم تقف مكتوفة الأيدي تنظر إلى فعل الرجال وجهادهم، بل شاركتهم الجهاد حينما نصبت خيمتها الإسعافية للجرحى في المعارك وساحات الوغى، فمثلت بتلك الخيمة ما نعرفه حاليا بالمستشفى الميداني الذي تعالج فيه آثار الحروق والكسر، وتضمد فيه الجراح وتسكن فيه الآلام وأنات المرضى، وقد كانت رفيدة رضي الله عنها رائدة في عملها هذا حيث ورد اسمها في التاريخ الإسلامي كأول ممرضة في الإسلام",
                "۞ عائشة بنت أبي بكر رضي الله عنها ۞<br><br>هي زوجة النبي عليه الصلاة والسلام وابنة الصديق أبو بكر رضي الله عنه، كانت رائدة في مجال علوم الفقه والشريعة، حيث كان الصحابة يأتون إليها يستفتونها في المسائل الشرعية التي تصعب عليهم ولا يعرفون حكمها، فكانت رضي الله عنها تتصدى للفتوى وبيان مسائل الدين وتفسير القرآن بما ورثته من العلم النبوي، وقد قيل فيها أن ربع علوم الشريعة الإسلامية قد أتت من السيدة عائشة رضي الله عنها",
                "۞ نسيبة بنت كعب المازنية ۞<br><br>هي الصحابية التي استولى حب الجهاد في سبيل الله تعالى على قلبها ووجدانها، حيث روي أنها شاركت في الذب عن رسول الله عليه الصلاة والسلام يوم أحد بسيفها حتى أصيبت في كتفها رضي الله عنها وأرضاها، فقد كانت مثالا في البذل والعطاء والتضحية، كما كانت رائدة في تطوعها للقتال إلى جانب الرجال في وقت لم تشارك فيه النساء في المعارك إلا بهدف تمريض الجرحى وإسعافهم",
                "۞ الشفاء بنت عبد الله العدوية ۞<br><br>هي صحابية جليلة ملأ حب الدين والدعوة قلبها وروحها، وقد اشتهرت رضي الله عنها بالعلم ورجاحة العقل، وقد كانت رائدة في مجال عملها حينما كانت تعلم نساء المسلمين القراءة والكتابة، كما يروى أن الفاروق عمر رضي الله عنها أوكل لها مهمة الحسبة ومراقبة الأسواق، حيث كانت تقضي في المنازعات التجارية بين التجار رضي الله عنها وأرضاها"
            ],
            ayaList: [
                "۞ وما كان الله معذبهم وهم يستغفرون ۞<br>إن ضاقت في عينيك الدنيا ف لك في الإستغفار فرجا كبيرا",
                "۞ وبشر الصابرين ۞<br>تشتد وتشتد وتشتد ، ثم يأتي الفرج من حيث لا تحتسب .فكن على ثقه بالله دائما ، ستأتي بعد زحام البلاء أفراح !",
                "۞ والكاظمين الغيظ ۞<br>لن ينسى الله سكوتك عن الكلام ، ولا عتبا كتمته ، ولا قهرا لجمته ، ولا ألما تحملته ، فثق بالله وأطمئن",
                "۞ فدعا ربه أني مغلوب فانتصر ۞<br>إهتف بوجعك ، بمرضك بانكسارك بهزيمتك بعجزك ، حينها يأتيك الفرج من رب السماء .. ياارب",
                "۞ فويل للقاسية قلوبهم من ذكر الله ۞<br>ما ضرب عبد بعقوبةأشد من قسوة القلب !",
                "۞ فمن اتبع هداي فلا يضل ولا يشقى ۞<br>النجاح دائما يبدأ من هنا",
                "۞ إن إلى ربك الرجعى ۞<br>إهرب حيث شئت لكن لا تنس :\" إن إلى ربك الرجعى \"واعمل ما شئت لكن تيقن ، أن هناك كتابا: \" لا يغادر صغيرة ولا كبيرة إلا أحصاها \"",
                "۞ فصبر جميل والله المستعان ۞<br>وإن الله قادر أن ينبت مكان الجرح زهرا",
                "۞ إنما يوفى الصابرون أجرهم بغير حساب ۞<br>أيخذل صابرا ؟حاشاه ربي ",
                "هناك طريقان<br>الأول: ۞ فاذكروني أذكركم ۞\r\nالثاني: ۞ نسوا الله فنسيهم ۞<br>فاختر لنفسك طريقا",
                "۞ يدعوكم ليغفر لكم ۞<br> نقصر في حقه ويدعونا ليغفر لناما أرحمه",
                "۞ ولقد مننا عليك مرة أخرى ۞<br>في كل مرة يدركني فيها ، لطفك الخفي أستشعر قولك<br>\"ولقد مننا عليك مرة أخرى\"\r\n",
                "۞ واصبر لحكم ربك فإنك بأعيننا ۞<br>أمع الله جرح لا يبرأ ؟ أمع الله كسر لا يجبر ؟ ثق بالله ولا تبتئس",
                "۞ الذي يراك حين تقوم ۞<br>تعلمنا الأيام ويخبرنا القرآن أنه لا شعور بالوحدة حين نستحضر بقلوبنا وجود الله تعالى",
                "۞ لا يحطمنكم سليمان وجنوده ۞<br>الله يسجل في كتابه مخاوف نملة .\r\nهل تظنه يجهل مخاوفك !! ",
                "۞ قال قد أوتيت سؤلك يا موسى ۞<br>اللهم إن نسألك هذا الشعور في هذا الوقت المبارك ",
                "۞ وتخشى الناس والله أحق أن تخشاه ۞<br>أقسى آية سمعته بحق نفسي ..!!<br>أستغفر الله العظيم وأتوب إليه ",
                "۞ رب لولا أخرتني إلى أجل قريب فأصدق وأكن من الصالحين ۞<br>ما قال لأصلي ولا لأصوم ولا لأعتمر قال لأتصدقالصدقة الصدقة أيها الناس تطفئ غضب الرب ",
                "۞ وإن يردك بخير فلا راد لفضله ۞<br>كل سبل الأرض لن تستطيع أن تقف أمام خير أراده الله لك ",
                "۞ ولينصرن الله من ينصره ۗ ۞<br>كل قضية حق نصرتها لله فقد أقسم الله أن ينصرك فيها ولو خذلك العالم كله !",
                "۞ وقال نسوة في المدينة امرأت العزيز تراود فتاها ۞<br>رغم أنها (غلقت الأبواب ) إلا أن فضيحتها عمت البلد فلا تأمن من مكر الله وأنت تعصيه",
                "۞ والذين جاهدوا فينا لنهدينهم سبلنا ۞<br>أقوى معركة في حياتك هي الثبات على الدين في زمن المتغيرات\r\nأسأل الله لي ولكم الثبات على طريق الحق اللهم ثبت قلوبنا على دينك ",
                "۞ إليه يصعد الكلم الطيب ۞<br>حتى ولو لم يقدر الآخرون طيبة كلماتك ..يكفيك أنها تصعد لربك",
                "۞ اقترب للناس حسابهم وهم في غفلة معرضون ۞<br>هذه الآية نزلت منذ اكثر من الف واربعمئة سنة يا ناس إرجعو إلى الله",
                "۞ أم أمنتم أن يعيدكم فيه تارة أخرى ۞<br>حين نجتاز بفضل الله أزمة في حياتنا علينا أن نشكر ربنا فهو قادر أن يعيدنا لنفس المأزق من جديد ",
                "۞ ولباس التقوى ذلك خير ۞<br>اذا ألبسك الله ثوب ستر على معصية فاحذر أن تكشفه بتأخير التوبة فإنك إن تبت ألبسك الله لباسا أجمل وأنقى ",
                "۞ قد بلغت من لدني عذرا ۞<br>البعض يكره الإعتراف بخطئه في أي حال والإعتذار عنده محال أما النفس الصادقة تحكم بالحق ولو على نفسها",
                "۞ وأيوب إذ نادى ربه أني مسني الضر وأنت أرحم الراحمين ۞<br>لم يتعلق سيدنا أيوب بشيء من عمله أو صبره لكن تعلق بإيمانه العميق أن ربه أرحم الراحمين",
                "۞ إن الله مع الصابرين ۞<br>لا تتحقق الأمال ولا تهون الصعاب إلا بالصبر",
                "۞ فاصبر على ما يقولون وسبح بحمد ربك قبل طلوع الشمس وقبل الغروب ۞<br>الحزن الذي يلمس النفوس في اخر النهار . له دواء",
                "۞ وتحسبونه هينا وهو عند الله عظيم ۞<br>نعوذ بالله من ذنب إحتقرناه ! فلم نستغفر منه ثم كان السبب الأكبر في سخط الله",
                "أنا أكثر منك مالا وأعز نفرا<br>لقد كان حقا أكثر منه مالا وخدما وحشما لكنها جريمة التعالي على عباد الله ! فإياك أن تتكبر على من هم دونك",
                "۞ إن الله يحب المتوكلين ۞<br>هب أن كل أمانيك لم تتحقق ألا يكفيك هذا الحب ؟ توكل على الله ",
                "۞ قالوا تالله إنك لفي ضلالك القديم ۞<br>حتى أقرب الناس لك قد يستخف بألامك وحده الله من يرحمك ! ",
                "۞ وتوكل على العزيز الرحيم ۞<br>مهما كنت قلقا من أمر ! فأجمل ما تفعله أن تفوضه إلى الله فهو أقدر منك عليه وأرحم بك من نفسك على نفسك !",
                "۞ وسيق الذين اتقوا ربهم إلى الجنة زمرا ۞<br>حتى وهم ذاهبون إلى الجنة لا يفترق الصالحون كانوا في الدنيا يجتمعون على الطاعة ويفترقون عليها والان هم ذاهبون معا إلى الجنة ",
                "۞ فتلقى آدم من ربه كلمات فتاب عليه ۞<br>حين تجرى كلمات التوبة على لسانك ويلهمك الله حروفها فى قلبك فتفائل بتوبة الله عليك",
                "۞ عسى ربنا أن يبدلنا خيرا منها ۞<br>إن ضاعت عليك فرصة واحترق قلبك عليها أطفئ لهيبها بهذه الاية",
                "۞ والنهار إذا تجلى ۞<br>كل ظلمة ليل تنجلي بنور الصباح ! وهكذا كل كرب وهم سينجلي بإذن الله",
                "۞ إن الله بالناس لرءوف رحيم ۞<br>كل الناس وأنت منهم أنت محفوف برحمة الله ورأفته",
                "۞ فتلك بيوتهم خاوية بما ظلموا ۗ ۞<br>بعض الخراب قد يكون من صنع أيدينا ! للمعصية شؤم ومذلة وعقوبة فلا نستهين اللهم اهدنا ثم اهدنا ثم اهدنا",
                "۞ وما تسقط من ورقة إلا يعلمها ۞<br>فكيف بدمع عينك ؟ أو حزن استوطن قلبك ؟ الله يعلم ما بك فقط تفائل واعلم أن الله لن يخذلك ابدا",
                "۞ يوم يفر المرء من أخيه ۞ وأمه وأبيه ۞ وصاحبته وبنيه ۞<br>فارقهم بالدموع والأحزان وحين لقاهم بعد مدة طويلة هرب منهم وقال اللهم نفسي نفسي يا له من يوم ! اللهم الأمان الأمان ",
                "۞ يوم يبعثهم الله جميعا فينبئهم بما عملوا ۚ أحصاه الله ونسوه ۚ والله على كل شيء شهيد ۞<br>فاكتب ما شئت فإنه محصى عليك فكيف لو كان ما كتبت خيرا",
                "۞ وما تفعلوا من خير يعلمه الله ۗ ۞<br>يكفيك علمه سبحانه لصالح عملك فلا داعي لتوثيقه للناس بالصور أو التصريح والتلميح به هنا وهناك",
                "۞ عبس وتولى ۞ أن جاءه الأعمى ۞<br>جاء النهي عن العبوس بوجه الأعمى وهو لا يرى فكيف بمن يرى ؟ إبتسم فالإبتسامة صدقة",
                "۞ فأردت أن أعيبها وكان وراءهم ملك يأخذ كل سفينة غصبا ۞<br>بعض الكسر جبر وبعض الأخد إبقاء ",
                "۞ وقالت لأخته قصيه ۖ ۞ قال سنشد عضدك بأخيك ۞<br>في المواقف الصعبة والشدائد ستجد اخوانك واخواتك هم من تستطيع الإتكاء والإعتماد عليهم ",
                "۞ إن الله وملائكته يصلون على النبي ۚ يا أيها الذين آمنوا صلوا عليه وسلموا تسليما ۞<br>أكثروا من الصلاة على النبى محمد ﷺ يوم الجمعة وفى كل يوم صلوا عليه وسلموا تسليما ",
                "۞ وكان أبوهما صالحا ۞<br>ثمرة صلاحك لن تقتصر عليك ستجنيها ذريتك إلى قيام الساعة ",
                "۞ ويشف صدور قوم مؤمنين ۞<br>أحزانك التي تختبئ وراء ضلوعك تخفيها عن أقرب الناس منك تعجز أنت عن تطويق الامها ( ربك يداويها لك )",
                "۞ فبعث الله غرابا يبحث في الأرض ليريه كيف يواري سوءة أخيه ۚ ۞<br>من استنكف عن الإصفاء للوحي اضطر للإصفاء لغراب",
                "۞ وإن يتفرقا يغن الله كلا من سعته ۚ وكان الله واسعا حكيما ۞<br>ليست كل علاقة تنتهي خسارة وفقدا إنها سعة الحياة الغنية بالفرص والتجارب الجديدة ",
                "۞ واستعينوا بالصبر والصلاة ۚ ۞<br>الصلاة نور وعون وأضعف الناس صبرا عن الشهوات واصطبارا على المكروهات هم أكثر الناس تفريطا وتضييعا للصلوات",
                "۞ قالوا إنا كنا قبل في أهلنا مشفقين ۞<br>لا تزعجك الامك سيصبح ذكراها يوما شيئا من النعيم",
                "۞ وأيوب إذ نادى ربه أني مسني الضر وأنت أرحم الراحمين ۞<br>هل تستطيع وأنت في غمرات الألم وتحت وطأة الوجع ! أن تستحضر يقينك بأن ربك أرحم الراحمين إن فعلت ذلك فترقب الفرج",
                "۞ وما كان الله معذبهم وهم يستغفرون ۞<br>أخبر الله سبحانه أنه لا يعذب مستغفرا لأن الإستغفار يمحو الذنب فيندفع العذاب استغفر الله العظيم وأتوب إليه ",
                "۞ فلو أن لنا كرة فنكون من المؤمنين ۞<br>تيقن أن عقارب الزمان لا تعود إلى الوراء وأن الفرصة ما زالت في يدك فأحسن استقبالها وتب إلى ربك ",
                "۞ ذلك من فضل الله علينا ۞<br>قالها يوسف وهو مسجون ظلما فى غربة: مهما كانت الالام هناك نعمة وشىء جميل يمكن الحديث عنه ",
                "۞ لكيلا تأسوا على ما فاتكم ۞<br>لا تحزن على ما فات فهو بقدر الله ولا تفرحوا بما آتاكم ۗ ولا تغتر بما اتاك الله فهو بفضل الله ",
                "۞ حتى إذا ركبا في السفينة خرقها ۖ ۞<br>كان في خرق السفينة نجاتهم ! كثيرا ما يرحمك الله من طريق تكرهه",
                "۞ فمن عفا وأصلح فأجره على الله ۚ ۞<br>بحجم الوجع الذي اثخنوك به وعفوت يكون أجرك الأجور الكبيرة تكون مع الجروج الكبيرة",
                "۞ فنعم أجر العاملين ۞<br>اجتهد في الصالحات فثمة نعيم لا يبلى وخيرا لا ينقطع وجنة لا تفنى ",
                "۞ وليعفوا وليصفحوا ۗ ۞<br>أرواحنا خلقت لفترة من الزمن وسترحل اعفوا واصفحوا فهي دنيا فانية وليست جنة دائمة ",
                "۞ ولقد نادانا نوح فلنعم المجيبون ۞<br>في الازمات اعرف من تنادي فليس الكل يسمعك",
                "۞ سيجعل الله بعد عسر يسرا ۞<br>لا تيأس مهما ضاقت الأمور واشتد البلاء",
                "۞ إذ يقول لصاحبه لا تحزن إن الله معنا ۞<br>من عطايا الله سبحانه وتعالى أنه يجمعك بأشخاص تقرأ الأمل بين أحرف كلماتهم فتشعر أن أوجاع الحياة انتهت",
                "۞ ألا يعلم من خلق وهو اللطيف الخبير ۞<br>قد لا يعرف الناس بعض أخلاقك الطيبة لا تحزن الذي خلق تلك الأخلاق في قلبك يعلمها ",
                "۞ فاجتباه ربه فجعله من الصالحين ۞<br>ألح يونس بالدعاء بعد خطئه فغفر له ربه وأكرمه ذنبك الأول لا يحول بينك وبين رضا ربك إن تبت ",
                "۞ وغلقت الأبواب وقالت هيت لك ۞<br>فى نفسها انها اغلقت كل الابواب وفى نفس يوسف مازال باب مراقبة الله مفتوحا ",
                "۞ فطوعت له نفسه قتل أخيه فقتله فأصبح من الخاسرين ۞<br>لقد كان القتل جريمة عظيمة في نفسه لكن القرآن عظم جريمته بكونه القتيل أخا له",
                "۞ ففروا إلى الله ۖ إني لكم منه نذير مبين ۞<br>لا أعرف من وما الذي تخاف منه لكني أعرف من تفر إليه ! ",
                "۞ كل نفس ذائقة الموت ۞<br>ليست معلومة تقرأ وانما حقيقة العمل ",
                "۞ وسرحوهن سراحا جميلا ۞<br>حتى فى لحظات الفراق كن جميل الاخلاق ",
                "۞ وأن إلى ربك المنتهى ۞<br>أوصل أامرك لله فإذا وصل انتهى ",
                "۞ قد جاءتكم موعظة من ربكم وشفاء ۞<br>قدم سبحانه الموعظة على الشفاء فمن اتعظ بالقرأن شفي من الهموم والأحزان",
                "۞ أيكم زادته هذه إيمانا ۞<br>أينا اذا قرأ القرأن زاد إبمانه ؟",
                "۞ قال أخرقتها لتغرق أهلها ۞<br>كم أوقعتنا العجلة فى إصدار الأحكام الخاطئة على الاخرين ! ",
                "۞ ومحياي ومماتي لله رب العالمين ۞<br>بئست الحياة لغير الله ",
                "۞ ألم تروا أن الله سخر لكم ما في السماوات وما في الأرض ۞<br>كل ماحولنا مسخر لنا لاتخف من الحياة التى ذللها الله لك ",
                "۞ وتوفنا مع الأبرار ۞<br>صحبة الصالحين شرف فى الحياة وبعد الممات",
                "۞ وإن يردك بخير فلا راد لفضله ۚ ۞<br>كل القوى التي على وجه الأرض لا تستطيع أن تمنع عنك خيرا أراده الله لك .! ",
                "۞ وأن لو استقاموا على الطريقة لأسقيناهم ماء غدقا ۞<br>أي أن الطاعة سبب للبسط فى الرزق والتوسعة فى العيش ! ",
                "۞ إذ نادى ربه نداء خفيا ۞<br>لاتحتاج لرفع صوتك اثناء الدعاء همسة وجعك تسمع فى السماء",
                "۞ والحافظون لحدود الله ۗ ۞<br>تفكر فى هذه الآية فهل أنت منهم ؟ جعلنا الله وإياكم من الحافظون لحدوده",
                "۞ فعسى أن تكرهوا شيئا ويجعل الله فيه خيرا كثيرا ۞<br>ليس خيرا واحد بل خيرا كثيرا ابتسم فى وجه البلاء فربما حمل لك العطاء ",
                "۞ الآن حصحص الحق ۞<br>تنام الحقيقه وتنام طويلا أحيانا لكنها لاتموت ! ",
                "۞ وأغرقنا آل فرعون وأنتم تنظرون ۞<br>اهلاك الظالم على مرأى من المظلوم يشفى الصدر ! ",
                "۞ فنادى في الظلمات أن لا إله إلا أنت سبحانك إني كنت من الظالمين ۞<br>حتى فى بطن الحوت كان هناك أمل ونحن نفقد الامل فى أبسط الأمور لا إله إلا الله محمد رسول الله ",
                "۞ يقول يا ليتني قدمت لحياتي ۞<br>أمنيات أهل القبور بين يديك فتداركها مادامت الروح فى الجسد ",
                "۞ يدبر الأمر من السماء إلى الأرض ۞<br>لاترهق نفسك بالتفكير فالرحيم سيختار لك ويتولى تدبير أمورك",
                "۞ وخلق الإنسان ضعيفا ۞<br>بلغ ضعفه أن كلمة تفرحه وأخرى تحزنه ",
                "۞ ومن يعمل سوءا أو يظلم نفسه ثم يستغفر الله يجد الله غفورا رحيما ۞<br>مهما اسود ماضيك، بالإستغفار تشرق الروح من جديد ",
                "۞ إن أجري إلا على الله ۖ ۞<br>ذكر بها نفسك عند كل عمل تقوم به ",
                "۞ فلما بلغ معه السعي ۞<br>نعمة الأبناء أن يكونوا معنا بأجسادهم وأرواحهم وعقولهم وتفكيرهم ",
                "۞ إذ رأى نارا فقال لأهله امكثوا إني آنست نارا لعلي آتيكم منها بقبس أو أجد على النار هدى ۞<br>النفوس العظيمه تلتقط كل اشارات الفأل مهما بدت بعيدة وخافتة لثقتهم بوعد الله",
                "۞ وآخرون اعترفوا بذنوبهم ۞<br>عندما تخطىء لاتكابر وتبرر لنفسك ",
                "۞ ثم ٱلسبيل يسره ۞<br>الأصل فى كل دروب الحياة اليسر اما العسر طارىء يرحل",
                "۞ إن الله يحب المقسطين ۞<br>كلمة عدل قد تفقدك بعض محبيك لكن الله من أجلها قد أحبك ",
                "۞ وجاءوا أباهم عشاء يبكون ۞<br>ليس كل حبيب دمعه صادق منزلته فى قلبك لاتعنى أخلاصه",
                "۞ ولن تجد من دونه ملتحدا ۞<br>تيقن منها ليس لك سواه الله وحده ملجؤك وحماك ",
                "۞ وليبتلي الله ما في صدوركم ۞<br>المواقف تخرج مافى القلوب ! ",
                "۞ ورحمتي وسعت كل شيء ۚ ۞<br>وسعت كل لحظة الم وكل خاطرة حزن وسعت ادق ادق تفاصيل همك وغمك",
                "۞ وألنا له الحديد ۞<br>ولو كانت ظروفك أقسى من الحديد فالله قادر ان يلينها لك ثق بالله ",
                "۞ قال ألقها يا موسى ۞ فألقاها ۞<br>كل مايأمرك الله بالقائه فالقه ولو كان أثيرا لديك ",
                "۞ وليعفوا وليصفحوا ۞<br>ارواحنا خلقت لفترة من الزمن وسترحل فاعفوا واصفحوا فهى دنيا وليست جنة ",
                "۞ وقال يا بني لا تدخلوا من باب واحد ۞<br>عجبا لأبوهم طعنوا فؤاده ومازال يحبهم ",
                "۞ إن الله بالناس لرءوف رحيم ۞<br>كل الناس وأنت منهم أنت محفوف برحمة الله ورأفته ",
                "۞ أيحسب أن لم يره أحد ۞<br>كل بقعة تحل فيها ستتحدث عن صنعك يوما فدون فيها ماترضى أن يراه الله منك ",
                "۞ وترى الشمس إذا طلعت تزاور عن كهفهم ذات اليمين ۞<br>من حرك الشمس ذات اليمين وذات الشمال من أجل فتية الكهف فهو قادر على تصريف أمورك دون أن تشعر ",
                "۞ تراهم ركعا سجدا ۞<br>مدحهم الله بأحب مشهد يراهم فيه ! ",
                "۞ وإذا مرضت فهو يشفين ۞<br>مرضك لايعنى أن الله لايحبك حتى خليل الرحمن عليه السلام يمرض ",
                "۞ ولنصبرن على ما آذيتمونا ۚ ۞<br>قلها بروحك وقلبك اهتف بها بلسانك اصرخ بها في سلوكك هذا هتاف الأنبياء ! ",
                "۞ إني ليحزنني أن تذهبوا به وأخاف أن يأكله الذئب وأنتم عنه غافلون ۞<br>لا تهمل احساس والديك فهو اصدق شعور على وجه الأرض ",
                "۞ ويوم نسير الجبال وترى الأرض بارزة ۞<br>يا من تكدرت خواطره بالهموم الله يزيل جبال ملامسه للغيوم فقط احسن ظنك بالحي القيوم",
                "۞ إنا كنا نستنسخ ما كنتم تعملون ۞<br>لأفعالك وكلامك وكتاباتك نسخة ستراها يوم القيامة فاحرص على ما يسرك ان تراه ",
                "۞ وما من دابة في الأرض إلا على الله رزقها ۞<br>من سوء الظن بالله أن تعلم بانه تكفل برزق كل دابة عجماء ثم تظن انه يضيع عبده الموحد ! توكل على الحي القيوم ولن تخيب ",
                "۞ فأرسلنا عليهم ريحا وجنودا لم تروها ۚ ۞<br>ليس شرطا أن ترى خطوات النصر والفرج فقد يسير الفرج إليك في الخفاء وانت لا تشعر "
            ],
            goldenList: [
                "من صلى الفجر في جماعة ثم قعد يذكر الله حتى تطلع الشمس ثم صلى ركعتين كانت له كأجر حجة و عمرة تامة ، تامة ، تامة",
                "كلمتان خفيفتان على اللسان ، ثقيلتان في الميزان ، حبيبتان إلى الرحمن ( سبحان الله وبحمده سبحان الله العظيم )",
                "من صام يوما في سبيل الله باعد الله وجهه من جهنم سبعين عاما",
                "من قال سبحان الله و بحمده في يوم مائة مرة غفرت له ذنوبه و إن كانت مثل زبد البحر",
                "من قال حين يسمع النداء (الأذان) ، اللهم رب هذه الدعوة التامة و الصلاة القائمة آت محمدا الوسيلة و الفضيلة و ابعثه المقام المحمود الذي وعدته حلت له شفاعتي يوم القيامة",
                "من صلى علي صلاة صل الله عليه بها عشر صلوات و حط عنه عشر خطيئات و رفع له عشر درجات",
                "من عاد (اي زار) مريضا لم يزل في خرفة الجنة حتى يرجع",
                "من قرأ أية الكرسي دبر كل صلاة لم يمنعه من دخول الجنة إلا أن يموت",
                "من توضأ فأحسن الوضوء ، ثم قال أشهد أن لا إله إلا الله وحده لا شريك له ، و أشهد أن محمدا عبده و رسوله ، اللهم اجعلني من التوابين و اجعلني من المتطهرين ، فتحت له أبواب الجنة الثمانية يدخل من أيها شاء",
                "ركعتي الفجر (ركعتي سنة الفجر) خير من الدنيا و ما فيها",
                "من صلى العشاء في جماعة فكأنما قام نصف ليله ، و من صلى الصبح في جماعة فكأنما صلى الليل كله",
                "من قال لا إله إلا الله وحده لا شريك له ، له الملك و له الحمد وهو على كل شئ قدير ، في يوم مئة مرة كانت له عدل عشر رقاب ، و كتبت له مئة حسنة ، و محيت عنه مئة سيئة , و كانت له حرزا من الشيطان يومه ذلك حتى يمسي و لم يأت أحد بأفضل مما جاء به الا رجل عمل أكثر منه",
                "من غسل يوم الجمعة و أغتسل ثم بكر و ابتكر و مشي و لم يركب ودنا من الامام ، و أنصت و لم يلغ كان له بكل خطوة يخطوها من بيته إلى المسجد عمل سنة أجر صيامها و قيامها",
                "من صلى على جنازة فله قيراط ، فإن شهد دفنها فله قيراطان ، القيراط مثل أحد",
                "من قال حين يمسي بسم الله الذي لا يضر مع اسمه شئ في الأرض ولا في السماء و هو السميع العليم - ثلاث مرات لم يصبه فجأة بلاء ، حتى يصبح ، و من قالها حين يصبح ثلاث مرات لم يصبه فجأة بلاء ، حتى يمسي",
                "لأن أقول سبحان الله و الحمد لله و لا إله إلا الله و الله اكبر ، أحب إلى مما طلعت عليه الشمس",
                "صوم يوم عرفه يكفر سنتين ماضيه و متقبله ، و صوم عاشورا ، يكفر سنه ماضية",
                "من قرأ سورة الكهف في يوم الجمعة أضاء ، له من النور مابين الجمعتين"
            ],
            signsList: [
                "معنى علامات يوم القيامة<br><br>علامات الساعة الصغرى: في الغالب تتقدم حصول القيامة بمدة طويلة ، ومنها ما وقع وانقضى وقد يتكرر وقوعه ومنها ما ظهر ولا يزال يظهر ويتتابع، ومنها ما لم يقع إلى الآن ، ولكنه سيقع كما أخبر الصادق المصدوق ﷺ.<br><br>وعلامات الساعة الكبرى: فهي أمور عظيمة يدل ظهورها على قرب القيامة وبقاء زمن قصير لوقوع ذلك اليوم العظيم ، ويكون خروجها متتابعا ، فإذا ظهرت أولى هذه العلامات فإن الأخرى على إثرها",
                "بعثة الرسول صل الله عليه وسلم<br><br>أخبر رسول الله ﷺ أن بعثته دليل وعلامة على قرب الساعة، وأنها أول أشراط الساعة الصغرى، عن سهل بن سعد رضوان الله عليه قال: \"رأيت رسول الله ﷺ قال بإصبعيه هكذا الوسطى والتي تلي الإبهام: (بعثت أنا والساعة كهذه من هذه)\" [صحيح البخاري: 3501]، وقال رسول الله ﷺ: \"بعثت في نسم الساعة\" [صحيح الجامع: 2832]، وقال القرطبي: \"أولها نبي الله محمد ﷺ لأنه نبي آخر الزمان، وقد بعث ليس بينه وبين القيامة نبي\"",
                "انشقاق القمر<br><br>قال تعالى: \"اقتربت الساعة وانشق القمر (1) وإن يروا آية يعرضوا ويقولوا سحر مستمر (2)\" [القمر 1: 2]، قال الحافظ ابن كثير: \"كان هذا في زمان الرسول ﷺ كما ورد في الأحاديث المتواترة بالأسانيد الصحيحة وهذا أمر متفق عليه بين العلماء أن انشقاق القمر قد وقع في زمان النبي ﷺ وأنه كان إحدى المعجزات الباهرات\"، وقال أنس بن مالك رضوان الله عليه: \"إن أهل مكة سألوا رسول الله ﷺ أن يريهم آية فأراهم انشقاق القمر\"، وقال عبد الله بن مسعود رضوان الله عليه: \"بينما نحن مع رسول الله ﷺ بمنى إذا انفلق القمر فلقتين، فكانت فلقة وراء الجبل، وفلقة دونه، فقال لنا رسول الله ﷺ: (اشهدوا)\" [صحيح مسلم: 2800]، وقال ابن عباس رضي الله عنهما: اجتمع المشركون على رسول الله ﷺ فقالوا: \"إن كنت صادقا فشق لنا القمر فرقتين نصفا على أبي قبيس ونصفا على قعيقعان وكانت ليلة البدر\"، فسأل رسول الله ﷺ أن يعطيه ما سألوا: فأمسى القمر نصفين على أبي قبيس ونصفا على قعيقعان ورسول الله ﷺ يقول: (اشهدوا)",
                "وفاة الرسول صل الله عليه وسلم<br><br>من علامات الساعة الصغرى وفاة النبي محمد ﷺ فقد قال عوف بن مالك: أتيت النبي ﷺ في غزوة تبوك، وهو في قبة من أدم (أي خيمة من جلد)، فقال: \" اعدد ستا بين يدي الساعة: موتي، ثم فتح بيت المقدس، ثم موتان يأخذ فيكم كقعاص الغنم (هو داء يصيب الدواب فيسيل من أنوفها شيء فتموت فجأة)، ثم استفاضة المال حتى يعطى الرجل مئة دينار فيظل ساخطا (أي يكثر المال عند الناس ويغتنوا حتى لا يكاد الرجل يفرح إلا بآلاف الدنانير) ثم فتنة لا يبقى بيت من العرب إلا دخلته، ثم هدنة تكون بينكم وبين بني الأصفر (الروم، وهم اليوم الأوروبييون والأمريكان)، فيغدرون فيأتونكم تحت ثمانين غاية تحت كل غاية اثنا عشر ألفا \" [صحيح الجامع: 1045]",
                "وفاة الصحابة<br><br>أصحاب رسول الله ﷺ هم خير الأمة بعده ﷺ وفي حديث أبي موسى الأشعري أن النبي ﷺ قال: \"النجوم أمنة للسماء فإذا ذهبت النجوم أتى السماء ما توعد، وأنا أمنة لأصحابي فإذا أنا ذهبت أتى أصحابي ما يوعدون، وأصحابي أمنة لأمتي فإذا ذهب أصحابي أتى أمتي ما يوعدون\" [صحيح مسلم: 2531]",
                "فتح بيت المقدس <br><br>في زمن الرسول ﷺ كان بيت المقدس تحت وطأة الإمبراطورية الرومانية وكانت دولة قوية متمكنة، وقد بشر النبي ﷺ بفتح بيت المقدس وعد ذلك من أشراط الساعة كما في حديث عوف بن مالك أن النبي ﷺ قال: \"اعدد ستا بين يدي الساعة.... وذكر منها فتح بيت المقدس\" [صحيح الجامع: 1045]، وقد فتح بيت المقدس في عهد الخليفة عمر بن الخطاب رضي الله عنه في عام (16 هجريا)، وبنى فيه مسجدا، وقد فتح بيت المقدس مرة في زمن الدولة الأيوبية فتحه صلاح الدين الأيوبي عام (583 هجريا)",
                "موتان يأخد فيكم كقعاص الغنم<br><br>من أشراط الساعة كما في حديث عوف بن مالك أن النبي ﷺ قال: \"اعدد ستا بين يدي الساعة.... وذكر منها الموتان يأخد فيكم كقعاص الغنم\" [صحيح الجامع: 1045]، ولفظ موتان هو مبالغة من الموت، أي يقع موت كثير جدا أشبه ما يكون بالوباء الذي يقضي على الناس جماعات جماعات، وقد قيل هذا وقع في طاعون عمواس والطاعون هو بثور أو أورام تظهر في الجسم من التهاب شديد ومؤذ جدا وهو مرض فتاك شديد العدوى، وعمواس هي قرية بفلسطين قرب بيت المقدس، فقيل أنه حدث في الأمة زمن عمر بن الخطاب بعد فتح القدس (عام 16 هجريا) انتشار مرض الطاعون وذلك في سنة (18 هجريا) في أرض الشام فمات الكثير بلغ عددهم خمسة وعشرين ألف رجل من المسلمين، ومات بسببه جماعات من سادات الصحابة منهم معاذ بن جبل وأبو عبيدة وشرحبيل بن حسنة والفضل بن العباس وغيرهم، وقعاص الغنم هو داء يصيب الدواب، فيسيل من أنوفها شيء، فتموت فجأة وقد شبه الرسول ﷺ الموتان بقعاص الغنم لأن الطاعون يظهر قرحة في البدن تسيل ثم يموت منها المصاب",
                "كثرة ظهور الفتن<br><br>الفتن جمع فتنة، وهي الاختبار والابتلاء واستعملت في كل شيء مكروه، وقد أخبر النبي ﷺ بمجيء الفتن العظيمة التي يلتبس فيها على المسلم الحق، وكلما ظهرت فتنة قال المؤمن هذه مهلكتي ثم تنكشف ويظهر غيرها. فعن أبي هريرة رضي الله عنه أن النبي ﷺ قال: \"بادروا بالأعمال فتنا كقطع الليل المظلم، يصبح الرجل مؤمنا ويمسي كافرا ويمسي مؤمنا ويصبح كافرا يبيع دينه بعرض من الدنيا\" [صحيح مسلم: 118]",
                "ظهور الخوارج<br><br>من علامات الساعة خروج بعض الفرق المخالفة لمنهج النبي وصحابته، ومن هؤلاء فرقة الخوارج وهم قوم كانوا من جماعة علي بن أبي طالب يقاتلون معه، ثم خرجوا عن طاعته بعد مسألة التحكيم بينه وبين معاوية بن أبي سفيان وانحازوا إلى قرية قرب الكوفة اسمها حروراء، عن عبد الله بن مسعود رضوان الله عليه قال: قال رسول الله ﷺ: \"يخرج آخر الزمان قوم أحداث الأسنان، سفهاء الأحلام، يقرءون القرآن لا يجاوز تراقيهم، يقولون من قول خير البرية، يمرقون من الدين كما يمرق السهم من الرمية\" [سنن الترمزي: 2188]، وعن أنس بن مالك عن النبي ﷺ قال \"يخرج قوم في آخر الزمان ، يقرؤون القرآن ، لا يجاوز تراقيهم ، سيماهم التحليق ، إذا لقيتموهم فاقتلوهم\" [صيحيح الجامع: 8054]",
                "ظهور مدعي النبوة<br><br>من علامات الساعة وأشراطها خروج الدجالين الكذابين الذين يدعون النبوة ويثيرون الفتنة بأباطيلهم، وقد أخبر النبي أن عدد هؤلاء قريب من ثلاثين، فقال رسول الله ﷺ: \"لا تقوم الساعة حتى يبعث دجالون كذابون قريب من ثلاثين، كلهم يزعم أنه رسول الله. وفي رواية: ينبعث\" [صحيح مسلم: 157]، وعن ثوبان مولى رسول الله أن رسول الله ﷺ قال: \"لا تقوم الساعة حتى تلحق قبائل من أمتي بالمشركين ، وحتى يعبدوا الأوثان ، وإنه سيكون في أمتي ثلاثون كذابون كلهم يزعم: أنه نبي ، وأنا خاتم النبيين ، لا نبي بعدي\" [سنن الترمذي: 2219]، قد يستشكل البعض بأن الرسول ﷺ أخبر أن مدعي النبوة ثلاثون بينما التاريخ والواقع يشهد أن أن العدد أكبر من ذلك؟ والجواب: هو أن هؤلاء الثلاثين هم الذين يكون لهم شهرة ودولة وأتباع، أما غيرهم ممن ليس له كذلك فلا يعد من الثلاثين",
                "شيوع الأمن والرخاء<br><br>أخبر النبي ﷺ أنه مع تقدم السنين واقتراب الساعة سيكثر الأمن ويعم الرخاء، فقال ﷺ: \"لا تقوم الساعة حتى تعود أرض العرب مروجا وانهارا، وحتى يسير الراكب بين العراق ومكة لا يخاف إلا ضلال الطريق....\" [تخريج المسند لشعيب: 9395]، وقال النبي ﷺ: \"يا عدي هل رأيت الحيرة (مدينة في العراق)؟ قلت: لم أرها وقد أنبئت عنها، فقال: فإن طالت بك حياة لترين الضغينة (المرأة) ترتحل من الحيرة حتى تطوف بالكعبة لا تخاف أحدا إلا الله\"[صحيح البخاري: 3595]",
                "ظهور نار من الحجاز<br><br>من علامات الساعة التي أخبر عنها الرسول ﷺ، خروج نار من أرض الحجاز، من جوار المدينة المنورة، وقد نص بعض العلماء والمؤرخين على أن هذه العلامة سنة (654 هجريا)، في حرة رهط في المدينة المنورة، قال الحافظ ابن كثير متحدثا عنها: \"كان ظهور النار من أرض الحجاز، والتي أضاءت لها أعناق الإبل ببصرى (مدينة حوران في سوريا)، كما نطق الحديث، فقد قال رسول الله ﷺ: \"لا تقوم الساعة حتى تخرج نار من أرض الحجاز تضيء لها اعناق الإبل ببصرى\" [صحيح البخاري: 7118]، وقيل أن النار بقيت ثلاثة أشهر، وكانت نساء المدينة يغزلن على ضوئها، وقال أبو شامة واصفا الواقعة: لما كانت (ليلة الأربعاء 3 جمادى الآخرة 654 هجريا)، ظهر بالمدينة المنورة دوي عظيم، ثم زلزلة رجفت منها الأرض والحيطان والسقوف والأخشاب والأبواب ساعة بعد ساعة إلى يوم الجمعة من الشهر المذكور. ثم ظهرت نار عظيمة في الحرة (موضع في المدينة) قريبة من بني قريظة نبصرها من دورنا من داخل المدينة، وكأنها عندنا نار عظيمة سالت أودية بالنار إلى وادي شظا مسيل الماء، وهي ترمي بشرر كالقصر",
                "قتال الترك<br><br>من علامات الساعة حروب ومعارك أخبر النبي أنها تقع بين المسلمين وغيرهم، ومن ذلك وقوع معركة بين المسلمين والترك، وقد حصل ذلك القتال في عصر الصحابة، في أول خلافة بني أمية وهزموا الترك وغنموا منهم، قال رسول الله ﷺ: \"لا تقوم الساعة حتى تقاتلوا الترك صغار الأعين، حمر الوجوه، ذلف الأنوف (انخفاض قصبة الأنف و انفراشه)، وكان وجوههم المجان المطرقة (المجن هو الترس، شبه وجوههم بالترس أي مستديرة، وبالمطرقة لغلظتها وكثرة لحمها)، ولا تقوم الساعة حتى تقاتلوا قوما نعالهم الشعر (نعال من جلود فيها شعر الحيوانات غير مدبوغة) \"[صحيح البخاري: 2928]، والمراد بهم التتار المغول الذين اجتاحوا البلاد الإسلامية عام (656 هجريا)",
                "ظهور رجال ظلمة يضربون الناس بالسياط<br><br>من علامات الساعة التي أخبر بها الرسول ﷺ أعوان الحكام الظلمة الذين يجلدون الناس بالسياط التي تشبه أذناب البقر، من السياط بأنواعها الجلدية والكهربائية والمطاطية وأغصان الشجر وغيرها، فعن رسول الله ﷺ قال: \" يكون في هذه الأمة في آخر الزمان رجال معهم سياط كأنها أذناب البقر ، يغدون في سخط الله ، و يروحون في غضبه\" [السلسلة الصحيحة: 1893]، وعن رسول الله ﷺ قال: \"صنفان من أمتي لم أرهما: قوم معهم سياط مثل أذناب البقر يضربون بها الناس .....\" [صحيح ابن حبان: 7461]، وقال رسول الله قال: \"إن طالت بك مدة، أوشكت أن ترى قوما يغدون في سخط الله، ويروحون في لعنته، في أيديهم مثل أذناب البقر\" [صحيح مسلم: 2857]",
                "كثرة الهرج (القتل)<br><br>من علامات الساعة التي ذكرها الرسول كثرة القتل، حتى إن الرجل يقتل الرجل لا يدري لم قتله، ولا المقتول لم قتل، قال رسول الله ﷺ: \"والذي نفسي بيده، لا تذهب الدنيا حتى يأتي على الناس يوم لا يدري القاتل فيم قتل، ولا المقتول فيم قتل، فقيل: كيف يكون ذلك؟، قال: الهرج، القاتل والمقتول في النار\" [2908]",
                "ضياع الأمانة<br><br>من علامات الساعة ضياع الأمانة فاذا ضاعة الأمانة انقلبت الموازين، وفسدت سرائر الناس، وتولى مقاليد الأمور غير الأكفاء، وتسود الفوضى، قال رسول الله ﷺ قال: \"أن الأمانة نزلت من السماء في جذر قلوب الرجال، ونزل القرآن فقرؤوا القرآن، وعلموا من السنة\" [صحيح البخاري: 7276]، وقال: \"ينام الرجل النومة، فتقبض الأمانة من قلبه، فيظل أثرها مثل أثر الوكت، ثم ينام النومة فتقبض، فيبقى أثرها مثل المجل، كجمر دحرجته على رجلك فنفط، فتراه منتبرا وليس فيه شيء، فيصبح الناس يتبايعون، فلا يكاد أحد يؤدي الأمانة، فيقال: إن في بني فلان رجلا أمينا، ويقال للرجل: ما أعقله! وما أظرفه! وما أجلده! وما في قلبه مثقال حبة خردل من إيمان\" [صحيح مسلم: 6497]، وعن أبي هريرة: \"بينما النبي ﷺ في مجلس يحدث القوم جاءه أعرابي فقال: متى الساعة؟، فمضى رسول الله ﷺ يحدث، فقال بعض القوم: سمع ما قال، فكره ما قال، وقال بعضهم: بل لم يسمع. حتى إذا قضى حديثه قال أين أراه السائل عن الساعة؟، قال: ها أنا يا رسول الله، قال: فإذا ضيعت الأمانة فانتظر الساعة، قال: كيف إضاعتها؟، قال: إذا وسد الأمر إلى غير أهله، فانتظر الساعة\" [صحيح البخاري: 59]",
                "اتباع سنن الأمم الماضية<br><br>من علامات الساعة التي أخبر بها النبي ﷺ أن فريقا من أمته سيقلدون الأمم الأخرى من اليهود والنصارى في عاداتهم وطبائعهم وغير ذلك، قال رسول الله ﷺ: \"لا تقوم الساعة حتى تأخذ أمتي بأخذ القرون قبلها شبرا بشبر وذراعا بذراع، فقيل: يا رسول الله كفارس والروم؟، فقال ومن الناس إلا أولئك\" [صحيح البخاري: 7319]، وقال رسول الله ﷺ: \"لتتبعن سنن الذين من قبلكم شبرا بشبر وذراعا بذراع، حتى لو دخلوا في جحر ضب لاتبعتموهم، قلنا: يا رسول الله اليهود والنصارى؟، قال: فمن؟\" [صحيح مسلم: 2669]، قال القاضي عياض: \"الشبر والذراع ودخول الجحر تمثيل للاقتداء والتقليد لهم\"، ليس تقليد اليهود والنصارى المذموم هو تبادل التجارب العلمية معهم، والاستفادة من مخترعاتهم وغير ذلك، إنما التقليد المذموم هو تقليدهم في الملابس، والعادات، وكيفية تعاملاتهم الاجتماعية وغير ذلك",
                "ولادة الأمة ربتها<br><br>كان رسول الله ﷺ يوما بارزا للناس، فأتاه رجل (حديث جبريل)، فقال: يا رسول الله متى الساعة؟ فقال: \"ما المسئول عنها بأعلم من السائل، ولكن سأخبرك عن أشراطها، إذا ولدت الأمة ربتها، فذاك من أشراطها ......\" [صحيح ابن ماجده: 3284]، واختلف العلماء في المقصود بأن تلد الأمة ربتها على أربعة أقوال:<br><br>1. أن تبيع السادة أمهات أولادهم، ويكثر ذلك فيتداول الملاك المستولدة حتى يشتريها ولدها ولا يشعر بذلك، وعلى هذا فالذي يكون من أشراط الساعة، غلبة الجهل بتحريم بيع أمهات الأولاد، أو الاستهانة بالأحكام الشرعية<br><br>2.لا يختص شراء الولد أمه بأمهات الأولاد، بل يتصور في غيرهن بأن تلد الأمة حرا من غير سيدها بوطء شبهة، أو رقيقا بنكاح أو زنا، ثم تباع الأمة في الصورتين بيعا صحيحا وتدور في الأيدي حتى يشتريها ابنها أو ابنتها<br><br>3. معناه اتساع الإسلام، واستيلاء أهله على بلاد الشرك وسبي ذراريهم، فإذا ملك الرجل الجارية واستولدها، كان الولد منها بمنزلة ربها لأنه ولد سيدها<br><br>4. أن يكثر العقوق في الأولاد، فيعامل الولد أمه معاملة السيد أمته من الإهانة بالسب والضرب والاستخدام فأطلق عليه ربها مجازا لذلك",
                "تطاول الحفاة العراة رعاة الشاء في البنيان<br><br>من علامات الساعة سيظهر أناس يتباهون ببناء المباني العالية والبيوت الفاخرة بعد أن كانوا حفاة عراة يرعون الغنم، كان رسول الله ﷺ يوما بارزا للناس، فأتاه رجل (حديث جبريل)، فقال: يا رسول الله متى الساعة؟ فقال: \"ما المسئول عنها بأعلم من السائل، ولكن سأخبرك عن أشراطها، وذكر منها أن ترى الحفاة العراة رعاة الشاء يتطاولون في البنيان ....... \" [صحيح ابن ماجده: 3284]، وفي رواية أخري من حديث جبريل: \"إذا رأيت الأمة ولدت ربتها أو ربها ، ورأيت أصحاب الشاء يتطاولون بالبنيان، ورأيت الحفاة الجياع العالة كانوا رؤوس الناس، فذلك من معالم الساعة وأشراطها\" [السلسلة الصحيحة: 1345]",
                "ظهور الكاسيات العاريات<br><br>أخبر النبي ﷺ أنه مع اقتراب الساعة سينتشر التبرج والسفور، وستخرج نساء يظهرن بألبسة ضيقة تصف أجسادهن، ويظهرن بألبسة شفافة تظهر عوراتهن، فهن كاسيات من حيث الظاهر، إلا أنهن عاريات بسبب ضيق لباسهن وظهر مفاتنهن، قال رسول الله ﷺ\" \"صنفان من أهل النار لم أرهما: قوم معهم سياط كأذناب البقر يضربون بها الناس، ونساء كاسيات عاريات مميلات (يجعلن غيرهن ينحرف) مائلات (منحرفات عن طاعة الله)، رؤوسهن كأسنمة البخت المائلة (تلبس فوق شعرها حتى يبدو كأنه سنام بعير مرتفعا)، لا يدخلن الجنة، ولا يجدن ريحها، وإن ريحها ليوجد من مسيرة كذا وكذا\" [صحيح مسلم: 2128]",
                "فشو التجارة ومشاركة المرأة زوجها في التجارة وسيطرة بعض التجار على السوق<br><br>من علامات الساعة، اننتشار التجارة واشتغال أغلب الناس بها لسهولة أمرها، لدرجة أن تصبح المرأة مشاركة مع زوجها في إدارتها، قال ﷺ \"إن بين يدي الساعة تسليم الخاصة، وفشو التجارة حتى تعين المرأة زوجها على التجارة .......\" [المستدرك على الصحيحين: 7239]، وقال رسول الله ﷺ \"إن من أشراط الساعة أن يفشو المال ويكثر، وتفشو التجارة، ويظهر العلم، ويبيع الرجل البيع فيقول: لا حتى أستأمر تاجر بني فلان، ويلتمس في الحي العظيم الكاتب فلا يوجد\" [الصحيح المسند: 1001]، (حتى أستأمر تاجر بني فلان .....): يفهم منه أن تجارا كبارا من اصحاب رؤوس الأموال، أو الوكلاء المعتمدون للسلع أو غير ذلك لعلهم مسيطرون على السوق، ومتحكمون في الأسعار، فلا يستطيع التجار الصغار التصرف في تجارتهم إلا بإذنهم، (ويلتمس في الحي العظيم الكاتب لا يوجد): إضافة إلى إخباره في أحاديث أخرى بانتشار الكتابة، فيفهم أنه مع انتشار الأجهزة الحديثة من الحاسوب والهاتف المحمول وغيرها، فينشأ جيل لا يتقن الكتابة باليد كما هو الحال الآن، أو لعل المقصود بالكتابة هنا، من يكتب عقد التجارة، ويتقن شروط البيع وأحكامه، فيكتب بين الناس العقود احتسابا غير طامع في مكافأة",
                "تسليم الخاصة<br><br>من علامات الساعة تسليم الخاصة (أن الرجل لا يلقي السلام إلا على من يعرفه)، قال رسول الله ﷺ: \"بين يدي الساعة تسليم الخاصة .........\" [تخريج المسند لشعيب: 3982]، مع أن السنة هي إلقاء السلام على من نعرف ومن لم نعرف، قال الرسول: \"لا تدخلون الجنة حتى تؤمنوا، ولا تؤمنوا حتى تحابوا، أولا أدلكم على شيء إذا فعلتموه تحاببتم؟ أفشو السلام بينكم\" [صحيح مسلم: 54]",
                "قطع الأرحام<br><br>من علامات الساعة قطع الأرحام، قال رسوال الله ﷺ: \"أن بين يدي الساعة تسليم الخاصة ......وذكر منها قطع الأرحام\" [تخريج المسند لشعيب: 3870]",
                "شهادة الزور<br><br>من علامات الساعة التي أخبر بها الرسول ﷺ شهادة الزور، وهي أن يكذب الإنسان في شهادته على الآخرين، فيشهد أن فلانا له الحق على فلان زورا، قال رسول الله ﷺ \"إن بين يدي الساعة .....وذكر منها شهادة الزور\" [تخريج المسند لشعيب: 3870]، وشهادة الزور ليست فقط عند القاضي، بل هي عامة في كل شهادة، كشهادة الناس بين بعضهم البعض، قال رسول الله ﷺ: \"من اقتطع حق امرئ مسلم بيمينه فقد أوجب الله له النار وحرم عليه الجنة، فقال له رجل: و إن كان شيئا يسيرا يا رسول الله؟ قال: وإن كان قضيبا من أراك (عودا من سواك)\" [صحيح مسلم: 137]",
                "كتمان شهادة الحق<br><br>من علامات الساعة أن يأكل الناس حقوق بعضهم البعض، ويسكت من يعرفون الحقيقة عن التصريح بها حتى وإن كانوا قادرين على ذلك، قال تعالى: \"ولا تكتموا الشهادة ومن يكتمها فإنه آثم قلبه\" [سورة البقرة: 283]، فهم يقدمون مصالحهم الشخصية على أداء الشهادة وهذا من علامات الساعة، قال الرسول ﷺ: \"إن بين يدي الساعة .....وذكر منها كتمان شهادة الحق\" [تخريج المسند لشعيب: 3870]",
                "ظهور الجهل<br><br>من علامات الساعة ظهور الجهل وانتشاره، قال رسول الله ﷺ: \"إن بين يدي الساعة لأياما، ينزل فيها الجهل، ويرفع فيها العلم .......\" [صحيح البخاري: 7062]، وقال ﷺ: \"إن من أشراط الساعة أن يرفع العلم ، و يظهر الجهل .....\" [صحيح الجامع: 2206]",
                "كثرة الشح والبخل<br><br>من علامات الساعة البخل والشح، وعن أبي هريرة رضي الله عنه قال: \"من أشراط الساعة أن يظهر الشح والفحش ويؤتمن الخائن .....\" [مجمع الزوائد: 7/330]، والشح أشد من البخل، لأنه حرص، وهو كل ما يمنع النفس من بذل مال أو معروف أو طاعة، والشح مرض نفسي يفتك بالمجتمع الإسلامي، لأن الشحيح يظل دائما يطلب المزيد، ولا يكتفي بما معه، وهذا يحمله على انتهاك الحرمات، بل ربما إلى القتل، فالشح سبب للهلاك والضياع، وقد حذر منه النبي ﷺ أمته فقال: \"اتقوا الشح فإن الشح أهلك من كان قبلكم أمرهم بالبخل فبخلوا وبالقطيعة فقطعوا\" [البداية والنهاية: 9/251]",
                "سوء الجوار<br><br>من علامات الساعة سوء الجوار، فعن النبي ﷺ: \"لا تقوم الساعة ..... وذكر وسوء المجاورة\" [تخريج المسند لشعيب: 6514]، فقد أوصنا رسول الله ﷺ فعن عائشة رضي الله عنها قالت قال ﷺ \"ما زال يوصيني جبريل بالجار، حتى ظننت أنه سيورثه\" [صحيح البخاري: 6014]، وحذر رسول الله ﷺ من سوء الجوار فقال \"والله لا يؤمن، والله لا يؤمن، والله لا يؤمن، قيل: ومن يا رسول الله؟ قال: الذي لا يأمن جاره بوايقه\" [صحيح البخاري: 6016]",
                "تخوين الأمين وائتمان الخائن<br><br>من علامات الساعة تخوين الأمين أي أن يشك فيه ولا يوثق في أمانته وصدقه، بينما يؤتمن الخائن الكاذب المنافق، قال رسول الله ﷺ: \"قبل الساعة سنون خداعة ، يكذب فيها الصادق ، ويصدق فيها الكاذب ، ويخون فيها الأمين ، ويؤتمن فيها الخائن ، وينطق فيها الرويبضة\" [نهاية البداية والنهاية: 1/214]، وعن أبي هريرة رضي الله عنه قال: \"من أشراط الساعة ..... وذكر ويؤتمن الخائن ويخون الأمين\" [مجمع الزوائد: 7/330]",
                "خروج رجل من قحطان<br><br>من علامات الساعة أن يخرج رجل من قحطان وهي قبيلة عربية معروفة تدين له الناس بالطاعة وتجتمع عليه بالكلمة وذلك عند تغير الزمان، قال رسول الله ﷺ: \"لا تقوم الساعة حتى يخرج رجل من قحطان يسوق الناس بعصاه\" [صحيح البخاري: 7117]، قال القرطبي: قوله يسوق الناس بعصاه كناية عن استقامة الناس وانعقادهم إليه واتفاقهم عليه، ولم يرد نفس العصا، وإنما ضرب بها مثلا لطاعتهم له واستيلائه عليهم، إلا أن في ذكرها دليلا على خشونته عليهم وعنفه بهم",
                "تمني الموت<br><br>من علامات الساعة تمني الموت، قال رسول الله ﷺ: \"لا تقوم الساعة حتى يمر الرجل بقبر الرجل فيقول: يا ليتني مكانه\" [صحيح البخاري: 7115]، فقد امرنا الرسول ﷺ بعد تمني الموت فقال \"لا يتمنى أحدكم الموت إما محسنا فلعله يزداد، وإما مسيئا فلعله يستعتب\" [صحيح البخاري: 7235]",
                "كثرة الزلازل<br><br>من علامات الساعة كثرة الزلازل، قال رسول الله ﷺ: \"لا تقوم الساعة حتى يقبض العلم، وتكثر الزلازل ....... \" [صحيح البخاري: 1036]",
                "معركة كبري بين المسلمين واليهود<br><br>من علامات الساعة أن تحدث معركة كبيرة بين المسلمين و اليهود وينصر الشجر و الحجر المسلمين، قال رسول الله ﷺ \"لا تقوم الساعة حتى تقاتلوا اليهود، حتى يقول الحجر وراءه اليهودي: يا مسلم، هذا يهودي ورائي فاقتله\" [صحيح البخاري: 2926]",
                "كثرة النساء وقلة الرجال<br><br>من علامات الساعة قلة الرجال و كثرة النساء، فعن رسول الله ﷺ قال: \"من أشراط الساعة .... وذكر ويقل الرجال، ويكثر النساء حتى يكون للخمسين امرأة القيم الواحد\" [صحيح البخاري: 6808]",
                "شرب الخمر وظهور الزنا<br><br>من علامات الساعة شرب الخمر، حيث قال رسول الله ﷺ: \"من أشراط الساعة، .... وذكر ويشرب الخمر، ويظهر الزنا\" [صحيح البخاري: 6808]",
                "كلام السباع الانس<br><br>من علامات الساعة كلام السباع مع الانس، حيث قال رسول الله ﷺ: \"والذي نفسي بيده لا تقوم الساعة حتى تكلم السباع الإنس ......\" [صحيح الترمذي: 2181]",
                "كلام الرجل مع غذبة السوط و شراك النعل<br><br>من علامات الساعة أن يكلم الرجل غذبة سوطه (طرف السوط) وذهب بعض العلماء الي أنها (المسجلات) وشراك نعله (سير النعل على ظهر القدم)، قال رسول الله ﷺ: \"والذي نفسي بيده لا تقوم الساعة ..... وذكر وحتى يكلم الرجل عذبة سوطه ، وشراك نعله\" [صحيح الترمذي: 2181]",
                "أخبار الفخذ بما حدث من أهله من بعده<br><br>من علامات الساعة أن تخبره فخذه بما حدث من أهله من بعده، قال رسول الله ﷺ: \"والذي نفسي بيده لا تقوم الساعة ..... وذكر وتخبره فخذه بما أحدث أهله بعده\" [صحيح الترمذي: 2181]",
                "ظهور المهدي المنتظر<br><br>من علامات الساعة ظهور المهدي المنتظر واسمه (محمد بن عبدالله) ، كما ورد عن رسول الله ﷺ: \"لو لم يبق من الدنيا إلا يوم -قال زائدة في حديثه: لطول الله ذلك اليوم. ثم اتفقوا- حتى يبعث الله فيه رجلا مني، أو من أهل بيتي، يواطئ اسمه اسمي، واسم أبيه اسم أبي\" [تخريج سنن أبي داود: 4282]، ويحكم بالقسط ويملا الأرض عدلا سبع سنين كما قال ﷺ: \"لا تقوم الساعة حتى يملك رجل من أهل بيتي أقنى يملأ الأرض عدلا وقسطا كما ملئت قبله ظلما يملك سبع سنين\" [صحيح ابن حبان: 6826]<br><br>قال بعض العلماء أنها أخر العلامات الصغري و بعض أنها أول ألعلامات الكبري",
                "المسيح الدجال<br><br>من علامات الساعة الكبرى المسيح الدجال أو الدجال الأعور، قالﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها والدجال\" [صحيح مسلم: 2901]، والمقصود بالدجال الكذاب من الدجل والتغطية، وهو جعد الرأس أعور العين اليمنى كمال قال ﷺ: \"..... فذهبت ألتفت فإذا رجل أحمر جسيم، جعد الرأس، أعور العين اليمنى، كأن عينه عنبة طافية، قلت: من هذا؟ قالوا: هذا الدجال، أقرب الناس به شبها ابن قطن\" [صحيح البخاري: 7026]، والمسيح الدجال أعطاه الله قدرات لكي يختبر الناس يخرج في مدينة اسمها (اصفهان) في قرية يهودية وتتبعه في هذه المدينة وحدها 70 الف من يهود الطيالسة، قال ﷺ: \"يتبع الدجال من يهود أصبهان، سبعون ألفا عليهم الطيالسة\" [صحيح مسلم: 2944]، يدعي الدجال أنه رجل صالح ثم يدعي أنه ملك ثم يدعي أنه نبي وفي الاخير يدعي أنه الرب هدفه القدس لكنه سيموت في النهاية يقتل على يد النبي عيسى ابن مريم في (غرب الأردن) قال ﷺ: \"...... وينزل الله عيسى بن مريم فيحصره هناك ثم يقتله هناك غرب الأردن\" [فتاوى نور على الدرب لابن باز: 4/290]، والدجال لا يدخل المدينة المنورة، كما قال ﷺ: \"لا يدخل المدينة رعب المسيح الدجال، لها يومئذ سبعة أبواب، على كل باب ملكان\" [صحيح البخاري: 7125]",
                "نزول عسي بن مريم عليه السلام<br><br> من علامات الساعة الكبري نزول سيدنا عيسي عليه السلام قالﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها ونزول عيسى ابن مريم ﷺ\" [صحيح مسلم: 2901]، فقد ثبت أنه سوف ينزل في آخر الزمان فيقتل المسيح الدجال ويكسر الصليب ويقتل الخنزير ولا يقبل من أهل الكتاب إلا الإسلام أو السيف، قال ﷺ: \"ينزل ابن مريم حكما مقسطا يكسر الصليب ويقتل الخنزير ويضع الجزية ويفيض المال حتى لا يقبله أحد\" [معجم الشيوخ: 2/1095]، وان سيدنا عيسى سيقابل الدجال ويقتله بباب للد، قال رسول الله ﷺ: \" يقتل ابن مريم الدجال بباب لد\" [صحيح الجامع: 8126]",
                "يأجوج ومأجوج<br><br>من علامات الساعة الكبري يأجوج ومأجوج، قالﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها ويأجوج ومأجوج\" [صحيح مسلم: 2901]، وهم من بني آدم، وهم في الشرق لاكن لا يعلم أحد مكانهم الا الله عزل وجل، وهم حبسو هناك حينما بنى ذو القرنين السد صاروا من ورائه من الداخل ولا يخرجو حتي يأذن لهم الله، وخروجهم سيكون في وقت عيسى عليه السلام وبعد خروج الدجال وبعد قتل الدجال، حينما يأذن الله بخروجهم ثم وينتشروا في الأرض فيعثوا فيها فسادا، وعن وقت خروجهم قال ﷺ: \"إن يأجوج ومأجوج ليحفرون السد كل يوم، حتى إذا كادوا يرون شعاع الشمس، قال الذي عليهم: ارجعوا فستحفرونه (غدا)، فيعودون إليه كأشد ما كان، حتى إذا بلغت مدتهم، وأراد الله أن يبعثهم على الناس، حفروا، حتى إذا كادوا يرون شعاع الشمس، قال الذي عليهم: ارجعوا فستحفرونه (غدا إن شاء الله)، ويستثني، فيعودون إليه وهو كهيئته حين تركوه، فيحفرونه ويخرجون على الناس ......\" [تخريج المسند لشعيب: 10632]، فيرسل الله عليهم نغفا في رقابهم فيموتون موتة حيوان واحد في الحال قال ﷺ: \"...... فيبعث الله عليهم نغفا في أقفائهم فيقتلهم بها، فقال رسول الله ﷺ: والذي نفس محمد بيده، إن دواب الأرض لتسمن وتشكر شكرا من لحومهم ودمائهم\" [تخريج المسند لشعيب: 10632]",
                "خسف بالمشرق وخسف بالمغرب وخسف بجزيرة العرب<br><br>من علامات الساعة الكبري خسف المشرق والمغرب و جزيرة العرب، قالﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها وثلاثة خسوف: خسف بالمشرق، وخسف بالمغرب، وخسف بجزيرة العرب\" [صحيح مسلم: 2901]، وأخبرنا النبي ﷺ أن هذه الخسوفات الثلاثة تكون عقوبة ربانية على ظهور المعاصي وانتشارها، كما جاء في الحديث عن النبي ﷺ أنه قال: \"يكون في آخر هذه الآمة خسف ومسخ وقذف، قالت عائشة رضي الله عنها: قلت يا رسول الله: أنهلك وفينا الصالحون؟، قال: نعم إذا ظهر الخبث\" [صحيح الترمذي: 2185]",
                "تغطي السماء بالدخان<br><br>من علامات الساعة الكبري ظهور دخان يغطي السماء، قال تعالى: \"فارتقب يوم تأتي السماء بدخان مبين (10) يغشى الناس هذا عذاب أليم (11) ربنا اكشف عنا العذاب إنا مؤمنون (12) أنى لهم الذكرى وقد جاءهم رسول مبين (13) \" [الدخان 10: 13]، وقال ﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها والدخان\" [صحيح مسلم: 2901]",
                "طلوع الشمس من مغربها<br><br>من علامات الساعة الكبرى طلوع الشمس من مغربها، قالﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها وطلوع الشمس من مغربها \" [صحيح مسلم: 2901]، فهو حدث عظيم يدل ظهورها على قرب القيامة وبقاء زمن قصير لوقوعه وهو تغير مفاجئ في نظام حركة الأفلاك يشاهده الكبير والصغير، وذلك أن الناس في صباح ذلك اليوم بينما ينتظرون إشراق الشمس و طلوعها من مكانها المعتاد من الشرق كما هو حالها منذ خلقها الله، فإذا بالشمس تطلع من الغرب، وعندها يقفل باب التوبة، حيث قالﷺ: \"باب التوبة مفتوح ما لم تطلع الشمس من مغربها\" [تفسير الطبري: 3/2/377]",
                "دابة الأرض<br><br>من علامات الساعة الكبرى الدابة التي تكلم الناس تخرج آخر الزمان، قال تعالى \"وإذا وقع القول عليهم أخرجنا لهم دابة من الأرض تكلمهم أن الناس كانوا بآياتنا لا يوقنون\" [النمل: 82]، وقال ﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، ..... فذكر منها ودابة الأرض\" [صحيح مسلم: 2901]، وذهب بعض العلماء أنها ستخرج من الحرم المكي",
                "النار التي تسوق الناس الي محشرهم<br><br>أخر علامات الساعة الكبري النار التي تسوق الناس الي محشرهم، قال ﷺ: \"إنها لن تقوم حتى ترون قبلها عشر آيات، .... فذكر آخر ذلك نار تخرج من اليمن تطرد الناس إلى محشرهم\" [صحيح مسلم: 2901]، حيث تسوق الناس إلى أرض الشام ، ثم عليها تقبض أرواحهم "
            ],
            sunnaList: [
                "التبسم في وجه المسلم<br><br>كان النبي ﷺ دائم البشاشة والتبسم<br>صحيح البخاري (3629)",
                "المشي بتواضع<br><br>كان يمشي بسكينة ووقار دون تكبر<br>سنن الترمذي (2015)",
                "تقصير الثوب<br><br>كان إزاره إلى منتصف ساقيه دون إسبال<br>صحيح مسلم (1203)",
                "حمل النعال باليد اليسرى<br><br>من هديه ﷺ حمل النعال باليسرى<br>سنن أبي داود (4140)",
                "الدعاء عند رؤية الهلال<br><br>كان يقول: الله أكبر، اللهم أهله علينا بالأمن والإيمان<br>سنن الترمذي (3446)",
                "التعوذ عند دخول الخلاء<br><br>كان يقول: أعوذ بالله من الخبث والخبائث<br>صحيح البخاري (142)",
                "الدعاء عند الخروج من المنزل<br><br>كان يقول: بسم الله، توكلت على الله<br>سنن الترمذي (3426)",
                "التثاؤب مع كتمه<br><br>كان يضع يده على فمه عند التثاؤب<br>صحيح مسلم (2995)",
                "الاستئذان ثلاثاً<br><br>من أدب الدخول الذي غفل عنه كثيرون<br>صحيح البخاري (6245)",
                "الدعاء بعد الأذان<br><br>كان يقول: اللهم رب هذه الدعوة التامة<br>صحيح البخاري (614)",
                "صلاة أربع ركعات بعد العصر<br><br>سنة ثابتة لكنها مهجورة<br>صحيح مسلم (1233)",
                "الوضوء قبل النوم<br><br>كان يوصي به ويضطجع على شقه الأيمن<br>صحيح البخاري (6311)",
                "قراءة سورة الإخلاص عند النوم<br><br>كان يجمع كفيه وينفث فيهما ثم يمسح بهما جسده<br>صحيح البخاري (5748)",
                "الدعاء عند سماع صوت الديك<br><br>كان يقول: اللهم إني أسألك من فضلك<br>صحيح مسلم (2729)",
                "الدعاء عند نزول المطر<br><br>كان يقول: اللهم صيباً نافعاً<br>صحيح البخاري (1032)",
                "عدم النفخ في الطعام<br><br>من آداب الطعام المهجورة<br>سنن أبي داود (3788)",
                "الأكل مما يلي الآكل<br><br>كان يأكل من أمامه ولا يتناول من وسط الصحفة<br>صحيح البخاري (5376)",
                "عدم عيب الطعام<br><br>كان لا يعيب طعاماً أبداً<br>صحيح البخاري (5409)",
                "التكبير عند الصعود والتسبيح عند النزول<br><br>من آداب السفر المنسية<br>صحيح مسلم (1344)",
                "الدعاء عند ركوب الدابة<br><br>كان يقول: بسم الله، الحمد لله<br>سنن أبي داود (2602)",
                "صلاة ركعتين عند القدوم من السفر<br><br>سنة ثابتة لكن قل من يحافظ عليها<br>صحيح البخاري (3088)",
                "تقليم الأظافر يوم الجمعة<br><br>من سنن الفطرة المهمة<br>صحيح مسلم (597)",
                "الاستنشاق ثلاثاً في الوضوء<br><br>من سنن الوضوء الدقيقة<br>صحيح مسلم (316)",
                "التسمية عند الجماع<br><br>كان يعلم أصحابه ذلك<br>صحيح البخاري (141)",
                "الدعاء عند سماع الرعد<br><br>كان يقول: سبحان الذي يسبح الرعد بحمده<br>موطأ مالك (1786)",
                "عدم الأكل متكئاً<br><br>من آداب الطعام النبوية<br>صحيح البخاري (5398)",
                "إجابة الداعي إلى الوليمة<br><br>من حقوق المسلم على أخيه<br>صحيح مسلم (2566)",
                "إطفاء الأنوار عند النوم<br><br>من الوقاية من الحوادث<br>صحيح البخاري (6296)",
                "الدعاء عند رؤية المريض<br><br>كان يقول: لا بأس طهور إن شاء الله<br>صحيح البخاري (5662)",
                "عدم الجلوس بين الظل والشمس<br><br>من الطب النبوي الوقائي<br>سنن أبي داود (4821)",
                "التعوذ عند الغضب<br><br>كان يعلم أصحابه ذلك<br>صحيح البخاري (6116)",
                "عدم النوم على البطن<br><br>من هديه ﷺ النهي عن ذلك<br>سنن أبي داود (5040)",
                "تغطية الإناء وإيكاء السقاء<br><br>من الوقاية من الأذى<br>صحيح مسلم (3755)",
                "الدعاء عند لبس الجديد<br><br>كان يقول: اللهم لك الحمد أنت كسوتنيه<br>سنن الترمذي (3457)",
                "عدم الشرب من فم السقاء<br><br>من النظافة الصحية<br>صحيح البخاري (5625)",
                "صلاة ركعتين عند التوبة<br><br>سنة عظيمة لكنها مهجورة<br>سنن أبي داود (1319)",
                "الدعاء عند المصيبة<br><br>كان يقول: إنا لله وإنا إليه راجعون<br>صحيح مسلم (2125)",
                "عدم التحدث أثناء الأكل<br><br>من آداب الطعام النبوية<br>سنن ابن ماجه (3350)",
                "التكبير عند رؤية الكعبة<br><br>من سنن زيارة المسجد الحرام<br>سنن الترمذي (3175)",
                "عدم إطالة الجلوس في الخلاء<br><br>من النظافة الشخصية<br>مسند أحمد (23456)",
                "الدعاء عند دخول القرية<br><br>كان يقول: اللهم ارزقنا خيرها<br>سنن ابن ماجه (3830)",
                "عدم البول في الماء الراكد<br><br>من النظافة البيئية<br>صحيح مسلم (423)",
                "الدعاء عند رؤية مبتلى<br><br>كان يقول: الحمد لله الذي عافاني<br>سنن الترمذي (3431)",
                "عدم النوم بعد العصر<br><br>من الطب الوقائي النبوي<br>مسند أحمد (17632)",
                "الدعاء عند سماع نباح الكلاب<br><br>كان يعوذ بالله من شرها<br>صحيح البخاري (3303)",
                "عدم البصق في المسجد<br><br>من تعظيم حرمات المساجد<br>صحيح البخاري (415)",
                "الدعاء عند الذبح<br><br>كان يقول: بسم الله والله أكبر<br>صحيح مسلم (3631)",
                "عدم الجلوس في الطرقات<br><br>من دون إعطاء الطريق حقه<br>صحيح البخاري (6229)",
                "الدعاء عند دخول المقبرة<br><br>كان يقول: السلام عليكم أهل الديار<br>صحيح مسلم (2277)"
            ],
            beda3List: [
                // البدع الأكثر انتشاراً (المرتبة الأولى)
                "الاحتفال بالمولد النبوي<br><br>من البدع التي لم يفعلها النبي ﷺ ولا أصحابه<br>حكمها: بدعة محدثة (ابن تيمية في اقتضاء الصراط المستقيم)",
                "الذكر الجماعي بعد الصلاة<br><br>لم يثبت عن النبي ﷺ تخصيص ذكر جماعي بعد الصلوات<br>حكمها: بدعة (اللجنة الدائمة للبحوث العلمية فتوى رقم 9403)",
                "قراءة سورة يس للميت<br><br>لم يثبت عن النبي ﷺ تخصيصها للموتى<br>حكمها: بدعة (الألباني في أحكام الجنائز)",
                "البناء على القبور وتجصيصها<br><br>خالف هدي النبي ﷺ في تسوية القبور<br>حكمها: بدعة محرمة (صحيح مسلم كتاب الجنائز)",

                // البدع المتعلقة بالصلاة (المرتبة الثانية)
                "صلاة الرغائب في رجب<br><br>صلاة مبتدعة لم تثبت عن النبي ﷺ<br>حكمها: بدعة ضلالة (النووي في المجموع)",
                "صلاة التسابيح<br><br>لم تثبت عن النبي ﷺ بسند صحيح<br>حكمها: بدعة (الألباني في سلسلة الأحاديث الضعيفة)",
                "صلاة الألفية في رمضان<br><br>صلاة مبتدعة بعد التراويح<br>حكمها: بدعة (اللجنة الدائمة فتوى رقم 8794)",
                "تخصيص دعاء ختم القرآن في الصلاة<br><br>لم يفعله النبي ﷺ ولا الصحابة<br>حكمها: بدعة (ابن عثيمين في فتاوى الصلاة)",

                // بدع المناسبات (المرتبة الثالثة)
                "الاحتفال بليلة الإسراء والمعراج<br><br>لم يثبت عن السلف أي احتفال بهذه المناسبة<br>حكمها: بدعة (ابن عثيمين في فتاوى نور على الدرب)",
                "الاحتفال بليلة النصف من شعبان<br><br>بدعة منتشرة لا أصل لها<br>حكمها: بدعة (ابن باز في التحذير من البدع)",
                "الاحتفال بذكرى الهجرة النبوية<br><br>لم يفعله النبي ﷺ ولا الصحابة<br>حكمها: بدعة (ابن تيمية في اقتضاء الصراط المستقيم)",
                "إقامة حفل ختان جماعي<br><br>مخالفة للسنة في إفراد كل طفل<br>حكمها: بدعة (ابن باز في فتاوى الطهارة)",

                // البدع المتعلقة بالجنائز والأموات (المرتبة الرابعة)
                "قراءة الفاتحة للميت بعد الدفن<br><br>لا أصل له في السنة النبوية<br>حكمها: بدعة (اللجنة الدائمة فتوى رقم 2157)",
                "قراءة القرآن للأموات بالمقابر<br><br>لا أصل له في الشرع<br>حكمها: بدعة (ابن عثيمين في فتاوى أركان الإسلام)",
                "إقامة سرادق للعزاء ثلاثة أيام<br><br>من عادات الجاهلية<br>حكمها: بدعة محرمة (ابن باز في التحذير من البدع)",
                "تحديد أربعين يوماً لإقامة العزاء<br><br>من تقاليد غير إسلامية<br>حكمها: بدعة (ابن عثيمين في فتاوى الجنائز)",

                // البدع الشركية الخطيرة (المرتبة الخامسة)
                "الطواف حول القبور ودعاء أصحابها<br><br>من الشرك الأكبر<br>حكمها: بدعة شركية (ابن باز في التحذير من البدع)",
                "الاستغاثة بغير الله في الشدائد<br><br>من الشرك الأكبر<br>حكمها: بدعة شركية (ابن تيمية في قاعدة جليلة)",
                "الطواف بالضريح أو القبة<br><br>من الشرك الأكبر<br>حكمها: بدعة شركية (اللجنة الدائمة فتوى رقم 4921)",
                "ذبح الذبائح عند القبور<br><br>من الشرك الأكبر<br>حكمها: بدعة شركية (ابن باز في التحذير من الشرك)",

                // بدع المساجد (المرتبة السادسة)
                "البناء على المساجد وزخرفتها<br><br>خالف هدي النبي ﷺ في بساطة المساجد<br>حكمها: بدعة (ابن تيمية في اقتضاء الصراط المستقيم)",
                "بناء المحاريب العالية في المساجد<br><br>لم تكن في عهد النبي ﷺ<br>حكمها: بدعة مكروهة (ابن تيمية في الفتاوى)",
                "تعليق الثريات الفاخرة في المساجد<br><br>إسراف ومخالفة لهدي النبي ﷺ<br>حكمها: بدعة مكروهة (ابن عثيمين في فتاوى البناء)",
                "تخصيص مكان معين في المسجد للدعاء<br><br>لا أصل له في السنة<br>حكمها: بدعة (الألباني في سلسلة الضعيفة)",

                // بدع العبادات اليومية (المرتبة السابعة)
                "التلفظ بالنية في العبادات<br><br>لم يفعله النبي ﷺ ولا الصحابة<br>حكمها: بدعة (ابن تيمية في الفتاوى الكبرى)",
                "الذكر بصوت جماعي واحد<br><br>خالف هدي النبي ﷺ في الذكر الفردي<br>حكمها: بدعة (ابن باز في فتاوى نور على الدرب)",
                "الذكر بالإعداد (مئة مرة وغيرها)<br><br>بصوت جماعي وبتنسيق معين<br>حكمها: بدعة (ابن عثيمين في فتاوى الصلاة)",
                "رفع الأيدي جماعة بعد الدعاء<br><br>لم يثبت عن النبي ﷺ ولا الصحابة<br>حكمها: بدعة (ابن عثيمين في فتاوى الصلاة)",

                // بدع الحج والعمرة (المرتبة الثامنة)
                "ربط الخيوط والخرق عند المقام أو عرفة<br><br>من أعمال الجاهلية<br>حكمها: بدعة شركية (ابن باز في فتاوى الحج)",
                "تقبيل الأرض عند رؤية الكعبة<br><br>لم يفعله النبي ﷺ<br>حكمها: بدعة (ابن عثيمين في مناسك الحج)",
                "الطواف بالمسجد النبوي<br><br>لا أصل له في الشرع<br>حكمها: بدعة (اللجنة الدائمة 6/35)",
                "تخصيص زيارة مسجد معين في يوم معين<br><br>إلا ما ورد به النص<br>حكمها: بدعة (ابن عثيمين في فتاوى الحج)",
                "التبرك بالماء المقروء عليه<br><br>لا أصل له في الشرع<br>حكمها: بدعة (ابن باز في مجموع الفتاوى)",
                "توزيع الحلوى في الموالد<br><br>من شعائر المبتدعة<br>حكمها: بدعة (ابن تيمية في الفتاوى الكبرى)",
                "حلق اللحية بحجة التجمل<br><br>مخالفة صريحة للأمر النبوي<br>حكمها: بدعة محرمة (الألباني في آداب الزفاف)",
                "إقامة مسابقات دينية بأجوائ باهظة<br><br>تحويل العبادة إلى تجارة<br>حكمها: بدعة مكروهة (ابن عثيمين في فتاوى المعاملات)"
            ],
            e3gaList: [
                "هناك الكثير من الاعجازات في القرآن مثل الاعجازات العلمية واللغوية والتاريخية والأخبار عن غيوب ومسائل تكون في المستقبل القريب والبعيد و الحقائق سنتعرض بعضها لكم",
                "الم (١) غُلِبَتِ الرُّومُ (٢) فِي أَدْنَى الْأَرْضِ وَهُمْ مِنْ بَعْدِ غَلَبِهِمْ سَيَغْلِبُونَ (٣) فِي بِضْعِ سِنِينَ لِلَّهِ الْأَمْرُ مِنْ قَبْلُ وَمِنْ بَعْدُ وَيَوْمَئِذٍ يَفْرَحُ الْمُؤْمِنُونَ (٤) [الروم 1: 4]<br><br>الإخبار بأن الروم ستَغلِب الفرس في بضع سنين أي أقل من عشر سنوات، بعد أن فرح الوثنيون في مكة بانتصار الفُرس على الروم، وتأهبوا على كذب ما وعد الله في كتابه فما مرت السبع سنوات إلا وتحقق ما وعد الله ، وكما عرف العصر الحديث أن منطقة البحر الميت هي أكثر الأراضي انخفاضًا في العالم",
                "قُلْ لَئِنِ اجْتَمَعَتِ الْإِنْسُ وَالْجِنُّ عَلَى أَنْ يَأْتُوا بِمِثْلِ هَذَا الْقُرْآنِ لَا يَأْتُونَ بِمِثْلِهِ وَلَوْ كَانَ بَعْضُهُمْ لِبَعْضٍ ظَهِيرًا \" [الإسراء: 88]\"<br><br>على الرغم من مرور الكثير من الوقت منذ قديم الزمن إلى الوقت الحاضر، إلا أن أهل اللغة إلى الآن ما زالوا يقرون بقوة الأسلوب القرآني",
                " تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ (1) مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ (2) سَيَصْلَى نَارًا ذَاتَ لَهَبٍ (٣) [المسد 1: 3]<br><br>أخبر القرآن أن أبا لهب سيصلى نارًا ذات لهب، أي أنه لن يدخل الإسلام وسيموت علي الكفر هو وزوجته، وقد مات أبو لهب علي الكفر بعد غزوة بدر ب7 ليال، ولم يفكر أن يُسلِم ولو نفاقًا كما أظهر بعض المنافقين الإسلام بينما أسلم ولديه عتبة ومتعب بعد فتح مكة.",
                "مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ (١٩) بَيْنَهُمَا بَرْزَخٌ لَا يَبْغِيَانِ (٢٠) [الرحمن 19: 20]<br><br>اكتشف الباحثون أن مياه البحار لا تمتزج مع بعضها البعض، بل لقد وجدوا أن مياه البحر الأبيض المتوسط لا تمتزج بمياه المحيط الأطلنطي عند جبل طارق. فهناك التقاء وبينهما حاجز",
                "أَوَلَمْ يَرَ الَّذِينَ كَفَرُوا أَنَّ السَّمَاوَاتِ وَالْأَرْضَ كَانَتَا رَتْقًا فَفَتَقْنَاهُمَا وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ أَفَلَا يُؤْمِنُونَ [الأنبياء: 30]<br><br>تشير الأية أن الكون خُلق من انفجار عظيم وأكتشف العلم الحديث هذه الحقيقة في نظرية الانفجار العظيم",
                "وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ [الذاريات: 47]<br><br>تشير الأية أن السماء تتسع، وفي عام 1929م، اكتشف (إدوين هابل) أن الكون يتمدد ويتسع",
                "يَوْمَ نَطْوِي السَّمَاءَ كَطَيِّ السِّجِلِّ لِلْكُتُبِ كَمَا بَدَأْنَا أَوَّلَ خَلْقٍ نُعِيدُهُ وَعْدًا عَلَيْنَا إِنَّا كُنَّا فَاعِلِينَ  [الأنبياء: 104]<br><br>تشير الأية أن الكون بعد توسعه سيرجع ويتقلص من جديد، وطبقاً لنظرية الارتداد العظيم، سيبدأ الكون بالانكماش مرة أخري حتي يرجع الكون كما كان في البداية",
                "وَلَقَدْ خَلَقْنَا الْإِنْسَانَ مِنْ سُلَالَةٍ مِنْ طِينٍ (١٢) ثُمَّ جَعَلْنَاهُ نُطْفَةً فِي قَرَارٍ مَكِينٍ (١٣) ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً فَخَلَقْنَا الْمُضْغَةَ عِظَامًا فَكَسَوْنَا الْعِظَامَ لَحْمًا ثُمَّ أَنْشَأْنَاهُ خَلْقًا آخَرَ فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ (١٤)  [المؤمنون 12: 14]<br><br>تخرج الحيوانات المنوية من الرجل لينجح منوي واحد في إخصاب البويضة، وينتج النطفة المكوّنة من ماء الرجل وماء الأنثى، وعبرت عنها الآيات الكريمة بالنطفة، بعد عملية الإخصاب تسير النطفة في رحلة عدة أيام حتى تصل إلى جوف الرحم فتخرج منها استطالات خلوية تنغمس في جدار الرحم حتى يمكنها امتصاص الغذاء من دم الأم، وأطلق القرأن على تلك المرحلة العلقة حيث تعلق النطفة بالرحم، وابتداءً من الأسبوع الثالث للحمل تبدأ مرحلة تكوين جديدة للجنين تحدثت عنها الآيات الكريمة وهي مرحلة المضغة غير المخلقة، حيث تظهر صورة الجنين في صورة شبيهة بمضغة الطعام تستمر في التغذية والانقسام حتى تصبح مضغة مخلقة، ومعنى مخلقة أي تبدأ في التمايز في شكل الأعضاء، وتتشكل في تلك المرحلة الأعصاب والغدد والحواس من سمع وبصر، تستمر مرحلة تطور الجنين حتى الوصول إلى نهاية الشهر الأول وبداية الشهر الرابع حيث تبدأ مرحلة خلق العظام التي يتكون منها جسد الجنين، ثمّ تكسى تلك العظام باللحم والعضلات، ثمّ ينشئه الله خلقاً آخر بعد أن تنفخ فيه الروح في نهاية الشهر الأول وبداية الشهر الرابع، ومعنى الخلق الآخر، أي المختلف عن مراحل الجنين الأولى حيث تتميز الأعضاء في تلك المرحلة تميزاً واضحاً، ويكتمل خلق الإنسان",
                "بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ وَإِذَا قَضَى أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُنْ فَيَكُونُ [البقرة: 117]<br><br>الكون ليس سرمديا كما كان شائعا قبل بروز نظرية نشأة الكون، ومن الممكن أنه قد وجد من العدم، وفقًا لنظرية التضخم، التي تقول أن كوننا هو كون فرعي تضخم داخل كون متعدد،  هذا الكون الذي خلق وفقًا لقوانين فيزيائية أكبر من فائقة الدقة لإنتاج الحياة من جسيمات غير مرئية لا يمكن أن يكون إلا نتيجة لتصميم خالق بكل شيء عليم وعلى كل شيء قدير، لأنه لو كانت البروتونات أثقل بنسبة 0.2٪ فقط، لن تكون هنالك حياة ولا ذرات ولا نجوم ولا مجرات ولا كواكب. وهذا يتفق مع نص الآية",
                "ثُمَّ اسْتَوَى إِلَى السَّمَاءِ وَهِيَ دُخَانٌ فَقَالَ لَهَا وَلِلْأَرْضِ ائْتِيَا طَوْعًا أَوْ كَرْهًا قَالَتَا أَتَيْنَا طَائِعِينَ [فصلت: 11]<br><br>الغبار (الدخان) الكوني هو نوع من الغبار الموجود بالفضاء الخارجي، ويتكون من حبيبات مكونة من عدة جزيئات إلى حبيبات يبلغ مقاييسها 1،0 من المليمتر (في المتوسط 3،0 ميكرومتر)، و هناك أنواع مختلفة من الغبار الكوني وهي تعتمد على مكان تواجده، فمنها ما يوجد في المجرات ومنها الغبار البين نجمي وهو ما يشكل السدم، والغبار بين الكواكب، وترجع أهمية الغبار الكوني إلى مساهمته في المراحل الأولية من تكون النجوم و النجوم ذات الكواكب مثل المجموعة الشمسية",
                "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ أَفَلَا يُؤْمِنُونَ [الأنبياء: 30]<br><br>الماء هو أساس البقاء لجميع الكائنات الحية، فهو سبب حياة الإنسان، والحيوان والنبات، وتم اكتشاف حيوان يسمى الكوالا في أستراليا وتحديدًا عام (1798م)، وتم أكتشاف أن هذا الحيوان لا يشرب الماء، وعندما درسوا هذا الحيوان وجدوا أنه يوجد لديه مصنع لتركيب الماء مصنع بكل ماتعنيه الكلمة، يأكل هذا الحيوان نوع من الحبوب موجودة في بيئته هذه الحبوب وبعد هضمها في الجهاز الهضمي تنتج غاز الهيدروجين كلنا نعرف أن الماء مكون من ذرتي هيدروجين وذرة أكسجين (H2o)وهو يحصل على الأكسجين من الهواء فيقوم مصنع المياه الداخلي بتركيب ذرتين من الهيدروجين الناتجة من الجهاز الهضمي وذرة من الأكسجين الناتجة من الجهاز التنفسي ويكون الماء داخليا ليظل التعميم الرباني [وجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ]",
                "وَإِنَّ لَكُمْ فِي الْأَنْعَامِ لَعِبْرَةً نُسْقِيكُمْ مِمَّا فِي بُطُونِهِ مِنْ بَيْنِ فَرْثٍ وَدَمٍ لَبَنًا خَالِصًا سَائِغًا لِلشَّارِبِينَ [النحل: 66]<br><br>بعد تقدم العلم واكتشاف كيفية تكون اللبن في الأنعام، ووجد الباحثون أن الأنزيمات الهاضمة تحول الطعام إلى فرث يسير في الأمعاء الدقيقة حيث تمتص العروق الدموية (الخملات) المواد الغذائية الذائبة من بين الفرث فيسري الغذاء في الدم، حتى يصل إلى الغدد اللبنية وهناك تمتص الغدد اللبنية المواد اللبنية التي سيكون منها اللبن من بين الدم فيتكون اللبن، الذي أُخرِج من بين فرث أولاً، ومن بين دم ثانياً",
                "فَمَنْ يُرِدِ اللَّهُ أَنْ يَهدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ وَمَنْ يُرِدْ أَنْ يُضِلَّهُ يَجْعَلْ صَدْرَهُ ضَيِّقًا حَرَجًا كَأَنَّمَا يَصَّعَّدُ فِي السَّمَاءِ كَذَلِكَ يَجْعَلُ اللَّهُ الرِّجْسَ عَلَى الَّذِينَ لَا يُؤْمِنُونَ [الأنعام: 125]<br><br>بعد تمكن الإنسان من بلوغ السماء بالطيران بوسائل النقل الحديثة عرف أنه كلما ارتفع إلى الأعلى في الجو قل الأوكسجين والضغط الجوي، مما يسبب ضيقاً شديداً في الصدور وعملية التنفس",
                "أَوْ كَظُلُمَاتٍ فِي بَحْرٍ لُجِّيٍّ يَغْشَاهُ مَوْجٌ مِنْ فَوْقِهِ مَوْجٌ مِنْ فَوْقِهِ سَحَابٌ ظُلُمَاتٌ بَعْضُهَا فَوْقَ بَعْضٍ إِذَا أَخْرَجَ يَدَهُ لَمْ يَكَدْ يَرَاهَا وَمَنْ لَمْ يَجْعَلِ اللَّهُ لَهُ نُورًا فَمَا لَهُ مِنْ نُورٍ  [النور: 40]<br><br>كشفت العلوم الحديثة إن في قاع البحار العميقة الكثيرة الماء (البحر اللجي) ظلمات شديدة، حتى إن المخلوقات الحية تعيش في هذه الظلمات بلا أدوات بصرية وإنما تعيش مستخدمة حواسها الأخرى كالسمع، ولا توجد هذه الظلمات الحالكة في ماء البحر الذي يحيط بالجزيرة العربية وإنما اكتشفوها في المحيطات البعيدة عنها ذات الماء الكثير، كما اكتشف العلماء موجاً بحرياً داخلياً يغشى البحر وهو أطول وأعرض من الموج السطحي وتم كشفه كذلك بواسطة الأقمار الصناعية، وهذه الظلمات نتيجة البحر العميق اللجي أولاً، ثم الموج الداخلي الذي يعكس أشعة ضوء الشمس فلا يسمح لها بالنفاذ إلى الأسفل ثانياً، والموج السطحي ثالثاً الذي يعكس جزءاً من الأشعة، والسحاب الذي يحجب كثيراً من أشعة الشمس فلا يسمح لها بالنفاذ إلى الأسفل رابعاً، فهي ظلمات بعضها فوق بعض وأسبابها المنشئة لها بعضها فوق بعض",
                "وَالْجِبَالَ أَوْتَادًا [النبأ: 7]، وَأَلْقَى فِي الْأَرْضِ رَوَاسِيَ أَنْ تَمِيدَ بِكُمْ وَأَنْهَارًا وَسُبُلًا لَعَلَّكُمْ تَهْتَدُونَ [النحل:15]<br><br>الوتد يغرس في الرمل لتثبيت الخيمة، وهكذا الجبال فقد اخترقت بامتداداتها الطبقة اللزجة التي تقع في أسفل الطبقة الصخرية التي كوِّنت القارات، فأصبحت بالنسبة للقارات كالوتد للخيمة، فالوتد يثبت الخيمة بالجزء الذي يغرس في الرمل وهكذا الجبال تثبت القارات بالجزء المغروس منها في الطبقة اللزجة التي تقع تحت الطبقة الصخرية التي تتكون منها القارات، ولقد تأكد للعلماء هذه الحقيقة العلمية في علوم الأرض عام (1965 ميلادي)،وأنه لولا الجبال لطافت القارات، ومادت الأرض واضطربت من تحت أقدامنا، وإن جعل الجبال كالأوتاد لكي لا تميد الأرض بنا لهو خير دليل على تحركها فلو كانت ثابثة لم يكن للجبال فائدة ثم إن كلمة الرواسي التي تستخدم للسفن مثل المثبت لها حين تكون راسية تقوي هذا المعنى",
                "وَأَرْسَلْنَا الرِّيَاحَ لَوَاقِحَ فَأَنْزَلْنَا مِنَ السَّمَاءِ مَاءً فَأَسْقَيْنَاكُمُوهُ وَمَا أَنْتُمْ لَهُ بِخَازِنِينَ [الحجر: 22]<br><br>أثبت العلم الحديث أن الرياح تقوم بالتلقيح الريحي للنباتات بنقل حبوب اللقاح إلى أعضاء التأنيث في الأزهار ليتم الإخصاب وتكوين الثمار، وتثير الرياح كذلك السحاب بتزويد الهواء بالرطوبة اللازمة، وإن إرسال الرياح بنوى التكثف المختلفة يعين بخار الماء الذي بالسحاب على التكثف، كما يعين قطيرات الماء المتكثفة في السحاب على مزيد من النمو حتى تصل إلى الكتلة التي تسمح لها بالنزول مطراً",
                "وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِيَ تَمُرُّ مَرَّ السَّحَابِ صُنْعَ اللَّهِ الَّذِي أَتْقَنَ كُلَّ شَيْءٍ إِنَّهُ خَبِيرٌ بِمَا تَفْعَلُونَ [النمل: 88]<br><br>ذكرنا سابقا أن الجبال مثل الأوتاد في تثبت القارات (الجبال مثبتة في الأرض) و الأرض تدور حول نفسها وهذا يعني أن الجبال تدور أيضا، وسرعة دوران الأرض حول نفسها حوالي 1600 كيلومتر في الساعة وهذا يعني أن الجبال تدور دوراناً سريعاً كالسحاب لكن الإنسان يراها ثابتة مستقرة وهذا ما ذكر في الأية السابقة",
                "وَالسَّمَاءِ وَالطَّارِقِ (١) وَمَا أَدْرَاكَ مَا الطَّارِقُ (٢) النَّجْمُ الثَّاقِبُ (٣) [الطارق 1: 3]<br><br>تم أكتشاف النجوم النابضة (pulsating star) وسمية بهذا الاسم‏ لأنها تصدر أصواتًا مثل صوت النبض أو الطرق، وهناك النجم النيوتروني (neutron star) ويسمى بالنابض الذي هو بقايا الشموس الهائلة الحجم، إنَّ هذا النجم النابض هو عبارة عن النواة المركزة للنجم الفاني، أثناء مرحلة المستعر الأعظم (supernova) وهو انفجار الطبقات الخارجية للنجم، ويبث إشعاعاً كهرومغناطيسياً يستمر حتى وقت موته النهائي، وهو يبث هذه الإشعاعات على استقامة محوره المغناطيسي الناتج عن دورانه وهو ليس محور دورانه نفسه، مما يؤدي إلى رؤية الإشعاع مرة واحدة في كل دورة من دورات هذا النجم، ويعطي الخاصية النبضية لهذا النجم، ويحدث صوتاً بسبب الموجات التضاغطية التي يحدثها في الفضاء، كما إنَّ هذا الإشعاع له قابلية إذابة أيّ جسم كونيّ يقع في مساره، فهو أيضاً ثاقب. يؤكد البروفسور (Richard Rothschild) من جامعة كاليفورنيا أن النجوم النابضة تنتج عن انفجارات النجوم وتبث كميات هائلة من الإشعاعات التي تعتبر الأشد لمعاناً وهي تعمل مثل المطرقة التي تدق",
                "مَثَلُ الَّذِينَ اتَّخَذُوا مِنْ دُونِ اللَّهِ أَوْلِيَاءَ كَمَثَلِ الْعَنْكَبُوتِ اتَّخَذَتْ بَيْتًا وَإِنَّ أَوْهَنَ الْبُيُوتِ لَبَيْتُ الْعَنْكَبُوتِ لَوْ كَانُوا يَعْلَمُونَ [العنكبوت: 41]<br><br>اكتشف العلم الحديث أن التي تقوم ببناء بيت العنكبوت هي أنثى العنكبوت فقط من خلال مغزل خاص موجود في نهاية بطنها، ولا يوجد مثله عند الذكر. وفي الأية شبه الله الذين يتخذون أولياء غير الله مثل الذين اتخذوا بيت العنكبوت ملجأ، كشف العلم مؤخرا سر ذلك التشبيه، حيث أن بيت العنكبوت هو أبعد البيوت عن صفة البيت بما يلزم البيت من أمان وسكينة وطمأنينة. فالعنكبوت الأنثى هي التي تبني البيت وتغزل خيوطه وهي الحاكمة فيه وتقتل الذكر بعد أن يلقحها وتأكله ولهذا يعمد الذكر إلي الفرار بعد أن يلقح أنثاه ولا يحاول أن يضع قدمه في بيتها، والأبناء يأكل بعضهم بعضا بعد الخروج من البيض، وتغزل أنثى العنكبوت بيتها ليكون فخاً وكميناً ومقتلاً للحشرات، وكل من يدخل البيت من زوار وضيوف يُقتل ويُلتهم، فهو أوهن البيوت لمن يحاول أن يتخذ منه ملجأ",
                "فَبَعَثَ اللَّهُ غُرَابًا يَبْحَثُ فِي الْأَرْضِ لِيُرِيَهُ كَيْفَ يُوَارِي سَوْأَةَ أَخِيهِ قَالَ يَا وَيْلَتَا أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَذَا الْغُرَابِ فَأُوَارِيَ سَوْأَةَ أَخِي فَأَصْبَحَ مِنَ النَّادِمِينَ [المائدة: 31]<br><br> أثبتت الدراسات العلمية أن الغراب هو أذكى الطيور وأمكرها، ويعلل ذلك بأن الغراب يملك أكبر حجم لنصفي دماغ بالنسبة إلى حجم الجسم في كل الطيور المعروفة. ومن بين المعلومات التي أثبتتها دراسات سلوك عالم الحيوان محاكم الغربان وفيها تحاكم الجماعة أي فرد يخرج على نظامها، ولكل جريمة عند جماعة الغربان عقوبتها الخاصة بها",
                "سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنْبِتُ الْأَرْضُ وَمِنْ أَنْفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ [يس: 36]<br><br>لقد كان معلوماً للناس قديماً إن الذكورة والأنوثة لا توجد إلا في الإنسان والحيوان، أما في النباتات فلم يعلم الناس حقيقة هذا الأمر إلا في الوقت الراهن بعلم النبات، مع تقدم علم التشريح للنبات",
                "وَالْأَرْضَ مَدَدْنَاهَا وَأَلْقَيْنَا فِيهَا رَوَاسِيَ وَأَنْبَتْنَا فِيهَا مِنْ كُلِّ شَيْءٍ مَوْزُونٍ [الحجر: 19]<br><br>كان الناس قديماً يجهلون حقيقة النباتات وتكوينها، وكشفت العلوم الحديثة إن النباتات تتكون من مواد أساسية واحدة هي: (كربون، وهيدروجين، ونتروجين، وكبريت أو فسفور) وبعض المواد الضئيلة الأخرى، غير إن سبب اختلاف نسبة التراكيب الكيمياوية في النبات يرجع إلى اختلاف أوزان النبات في كل منها، وإن جذر كل نبات لا يمتص من المواد في الأرض إلا بمقادير موزونة محددة",
                "وَهُوَ الَّذِي أَنْزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ فَأَخْرَجْنَا مِنْهُ خَضِرًا نُخْرِجُ مِنْهُ حَبًّا مُتَرَاكِبًا وَمِنَ النَّخْلِ مِنْ طَلْعِهَا قِنْوَانٌ دَانِيَةٌ وَجَنَّاتٍ مِنْ أَعْنَابٍ وَالزَّيْتُونَ وَالرُّمَّانَ مُشْتَبِهًا وَغَيْرَ مُتَشَابِهٍ انْظُرُوا إِلَى ثَمَرِهِ إِذَا أَثْمَرَ وَيَنْعِهِ إِنَّ فِي ذَلِكُمْ لَآيَاتٍ لِقَوْمٍ يُؤْمِنُونَ [الأنعام: 99]<br><br>لم يعلم الناس قديماً كيف يتكون الحب والثمار في النبات، وأخذ العلماء يدرسون علم النبات وكيف يُكوِّن النبات حبوبه وثماره ولعلنا نقدر على محاكاة هذه الحقيقة الغائبة عن تصورنا، ثم اكتشف علماء النباتات التمثيل الضوئي (التمثيل الكلوروفيلي) حيث وجدوا أن في النبات مصانع خضراء صغيرة (بلاستيدات خضراء) هي التي تعطي النبات لونه الأخضر ومنها تخرج المواد الغذائية التي تتكون منها الحبوب والثمار، وسائر أجزاءه. وبعد سقيه بالماء يخرج النبات من البذور في الأرض وهذه المصانع الخضراء هي أول من يخرج من الحبة عند بدء نموها،فالآية أشارت لحقيقة المادة الخضراء بأنه يخرج منها الحبوب والثمار متراكبة فالحديث هنا عن الصبغة الخضراء المعروفة بالكلوروفيل لا عن النبات",
                "فَلَا أُقْسِمُ بِمَوَاقِعِ النُّجُومِ ٧٥ وَإِنَّهُ لَقَسَمٌ لَوْ تَعْلَمُونَ عَظِيمٌ [الواقعة 75: 76]<br><br>إن الناظر للسماء يظن النجوم قريبة، غير أن التقدم العلمي في علوم الفيزياء الفلكية جاء ليبين لنا إن الأبعاد فيما بين النجوم ومواقعها كبيرة جداً لا يتخيلها أو يتصورها عقل بشر، وهذه النجوم قد خرج منها ضوءها قبل فترة طويلة فمنها ما يبعد سنوات ضوئية. عن الأرض ومنها ما يبعد عدة ملايين من السنين الضوئية. وما نراه في الحقيقة هو مواقعها التي غادرتها في غابر الأزمان، وهذه الحقيقة بقيت مجهولة حتى مطلع القرن العشرين، حيث بينت المراصد الفلكية بعد المسافة إلى هذه الأجرام السماوية وكوننا لا نرى سوى مواقعها التي غادرتها وهذه النجوم تنطلق في الفضاء بسرعة كبيرة لا يعلم مداها وهي تضيء وينطلق ضوءها من حولها",
                "أَلَمْ تَرَ أَنَّ اللَّهَ يُزْجِي سَحَابًا ثُمَّ يُؤَلِّفُ بَيْنَهُ ثُمَّ يَجْعَلُهُ رُكَامًا فَتَرَى الْوَدْقَ يَخْرُجُ مِنْ خِلَالِهِ وَيُنَزِّلُ مِنَ السَّمَاءِ مِنْ جِبَالٍ فِيهَا مِنْ بَرَدٍ فَيُصِيبُ بِهِ مَنْ يَشَاءُ وَيَصْرِفُهُ عَنْ مَنْ يَشَاءُ يَكَادُ سَنَا بَرْقِهِ يَذْهَبُ بِالْأَبْصَار [النور: 43]<br><br>من مزايا السحب الركامية أنها تمتد رأسياً إلى علو خمسة عشر كيلومتراً أو أكثر، وبذلك تظهر لمن ينظر إليها عن بعد كالجبال الشاهقة. وتتيح فرصة النمو في الاتجاه الرأسي نشوء السحب الركامية عبر طبقات من الجو تختلف درجاتها الحرارية اختلافاً بيناً، فتنشأ بذلك الدوامات الرأسية وتتولد حبيبات البرد، ولهذا فإن السحاب الركامي هو وحده قادر على توليد حبيبات البرد الثلجية، وهكذا يقرر الجزء الأول من الآية مراحل تكون السحب الركامية الممطرة بالرغم من إن الإنسان لم يتوصل لهذه الحقيقة إلا حديثًا، وعندما استخدم العلماء الرادار في أعقاب الحرب العالمية الثانية تبين لهم أن السحب إنما تبدأ على هيئة عدة خلايا أو وحدات من السحب التي تثيرها تيارات الهواء فتتوحد وتكون السحب الركامية، ثم يخصصها بالنمو الرأسي حتى تصير كالجبال فعندئذ تجود دون غيرها من السحب بالبرد، وليس من اللازم أن يتساقط البرد من السحابة بمجرد تكونه، إذ ربما يحول التيار الهوائي الصاعد دون نزوله في مكان معين حتى إذا ما ضعف هذا التيار هوى البرد على هيئة ركام لا هوادة فيه، وكأنما انفجرت السحابة وهذا يقرر الجزء الأخر من الآية",
                "اللَّهُ الَّذِي رَفَعَ السَّمَاوَاتِ بِغَيْرِ عَمَدٍ تَرَوْنَهَا ثُمَّ اسْتَوَى عَلَى الْعَرْشِ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَ كُلٌّ يَجْرِي لِأَجَلٍ مُسَمًّى يُدَبِّرُ الْأَمْرَ يُفَصِّلُ الْآيَاتِ لَعَلَّكُمْ بِلِقَاءِ رَبِّكُمْ تُوقِنُونَ [الرعد: 2]<br><br>تشير الدراسات الكونية إلى وجود قوى مستترة، في اللبنات الأولية للمادة، تحكم بناء الكون، وتمسك بأطرافه، ومن القوى التي تعرف عليها العلماء في كل من الأرض والسماء أربع صور يعتقد بأنها أوجه متعددة لقوة عظمى واحدة، تسري في مختلف جنبات الكون، لتربطه برباط وثيق، وإلا لانفرط عقده، وهذه القوى هي (القوة النووية الشديدة ، القوة النووية الضعيفة ، القوة الكهرومغناطيسية ، قوة الجاذبية). وهذه القوى الأربع هي الدعائم الخفية، التي يقوم عليها بناء الكون، وقد أدركها العلماء من خلال آثارها الظاهرة والخفية في كل أشياء الكون المدركة، وتعتبر قوة الجاذبية على المدى القصير أضعف القوى المعروفة لنا، وتساوي (10: 39) من القوة النووية الشديدة، ولكن على المدى الطويل تصبح القوة العظمى في الكون، نظرًا لطبيعتها التراكمية، فتمسك بكافة أجرام السماء، وبمختلف تجمعاتها. ولولا هذا الرباط الحاكم، الذي أودعه الله في الأرض، وفي أجرام السماء ما كانت الأرض، ولا كانت السماء. ولو زال هذا الرباط، لانفرط عقد الكون، وانهارت مكوناته",
                "وَالْأَرْضَ بَعْدَ ذَلِكَ دَحَاهَا [النازعات: 30]<br><br>معنى (دحاها): أي بسطها لتكون صالحة للإنسان والنبات، ومن معاني (الأدحية): موضع بيضة النعامة (أي فيها تفلطح)، ومن معاني (دحا): دحرج. ويظهر إن الأرض عند انفصالها أخذت تدور وتتدحرج في مسارها ولا تزال تتدحرج وتتقلب وهي تجري في فلكها، فهل هناك تفسير أوضح لهذه الحقيقة العلمية من غير كلمة دحاها",
                "وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّى عَادَ كَالْعُرْجُونِ الْقَدِيمِ [يس: 39]<br><br>مراحل وأشكال القمر والتنقل في منازل معلومة، وأوضح علم الفلك الحديث أن سبب تغيير شكل القمر في كل شهر وهو تنقله في منازل (مواقع) معلومة حتى يعود هلالاً كما بدأ والعرجون تعبير عن شكل الهلال المقوس",
                "وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا [نوح: 16]<br><br>نجد في هذه الآية التفريق بين ضوء القمر والشمس، وهكذا جميع آيات القرآن تصف الشمس بالسراج المنير الوهاج المضيء، بينما تصف الآيات القرآنية القمر بالنور، فالفرق واضح في التعبير ويدل على حقيقة علمية واضحة وهي أن التقدم العلمي أثبت أن ضوء الشمس من ذاتها ينبع فهي كالسراج المشتعل، بينما القمر فليس ضوؤه إلا انعكاساً من الشمس فليس من ذاته ولقد أنير بنور الشمس",
                "وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَهَا ذَلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ [يس: 38]<br><br>اعتقد العلماء في القرن الماضي أن الشمس هي مركز الكون وأنها ثابتة في حجمها وكتلتها ومكانها، وأن كل شيء يتحرك حولها، لكن أكتشف مؤخرا أن الشمس تجري وتتحرك بسرعة (1.997 كم\\ث)",
                "وَأَنْزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ وَلِيَعْلَمَ اللَّهُ مَنْ يَنْصُرُهُ وَرُسُلَهُ بِالْغَيْبِ إِنَّ اللَّهَ قَوِيٌّ عَزِيزٌ [الحديد: 25]<br><br>أقرته الأبحاث العلمية واجتهادات العلماء في النصف الثاني من القرن العشرين الذين رأوا في تكوين الحديد ما حيرهم حيث أن الإلكترونات والنيترونات في ذرة الحديد لكي تتحد تحتاج إلى طاقة هائلة تبلغ أربع مرات مجموع الطاقة الموجودة في مجموعتنا الشمسية ولذلك لا يمكن أن يكون الحديد قد تكوّن على الأرض، ولابد أنه عنصر غريب وافد إلى الأرض ولم يتكوّن فيها، وأن حديد الأرض قد أنزل لمجموعتنا و الأرض من السماء، وهناك توافق عددي عجيب توصل إليه أحد أساتذة الكيمياء في أستراليا وهو توافق بين رقم آية الحديد في سورة الحديد إذا ما حسبنا البسملة آية فتصبح هي رقم (26) والعدد الذري لمعدن الحديد وهو أيضاً (26)",
                "حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنْزِيرِ [المائدة: 3]<br><br>أثبت الدراسات اماكن وجود الجراثيم بالجسم في الأمعاء الغليظة حيث توجد الفضلات، و هذا مستودع هائل للجراثيم والبكتيريا، لكنها لا تستطيع أن تخترق جدار الأمعاء الغليظة، لأن هناك جدارا يمنع دخولها للجسم، فإذا مات الكائن سقطت تلك المناعة وهنا تخترق الجراثيم جدار الأمعاء وتدخل وتسري في الدم، و تتغذى عليه وتغزو الجسم كله، وتفرز سموما كثيرة تضر الإنسان ضررا بالغا\r\nأكدت البحوث العلمية أن أضرار شرب الدم أو طبخه كبيرة بسبب ما يحويه الدم من الجراثيم، فضلاً عن أن الدم عنصر فقير جدّاً من الناحية الغذائية، وأن القدر البروتيني الذي يحويه الدم يأتي مختلطاً بعناصر شديدة السمية، وغاية في الضرر، الأمر الذي يجعل الإقدام على تناوله مجازفة كبرى وإلقاء للنفس في التهلكة، بل هو فوق ذلك يحتوي على عناصر سامة مثل ثاني أكسيد الكربون، وهو غاز خانق\r\nأكتشف العلماء في عصرنا الحاضر وجود العديد من الأمراض في لحوم الخنازير ما يكفي لترك تناوله، حيث يمكن أن يصاب الشخص المدمن على تناول لحم الخنزير بالتهاب الكبد (E)، وهو مرض فيروسي يصيب الكبد، وأنه خطر جدا على النساء الحوامل، حيث تشير البيانات الرسمية إلى أن 25% من النساء الحوامل المصابات بهذا المرض يمتن في الأسابيع الأخيرة من فترة الحمل، كما أن الخنزير ناقل للطفيليات، فيمكن أن يصاب من يأكله بداء الشعرينات الطفيلي (Trichinosis) الذي تسببه دودة (Trichinella)الطفيلية، ويسبب هذا الداء الحمى والطفح الجلدي، وفي حالات معينة تصيب تلك الطفيليات الأعضاء الداخلية للجسم والجهاز العصبي المركزي، وأن لحم الخنزير يحتوي على بكتيريا تسبب اليريسينيا (yersiniosis)، وهي عدوى معوية حادة يرافقها إسهال وحرقة وآلام حادة، ووفقا لنتائج الدراسات التي أجرتها الأكاديمية الأمريكية لعلوم الأعصاب عام 1983، يمكن أن تؤدي اليريسينيا إلى مضاعفات لمجموعة من الأمراض العصبية"
            ],
            storiesList: [

            ],
            alBaytList: [
                // زوجات النبي ﷺ (أمهات المؤمنين)
                "خديجة بنت خويلد رضي الله عنها<br><br>أول زوجات النبي ﷺ وأم المؤمنين<br>موضع ذكر فيه: حديث النبي ﷺ: «خير نساء العالمين مريم وآسية وخديجة وفاطمة» [صحيح البخاري: 3432]",
                "سودة بنت زمعة رضي الله عنها<br><br>ثاني زوجات النبي ﷺ<br>موضع ذكر فيه: ﴿وَامْرَأَةً مُّؤْمِنَةً إِن وَهَبَتْ نَفْسَهَا لِلنَّبِيِّ﴾ [الأحزاب: 50]",
                "عائشة بنت أبي بكر رضي الله عنها<br><br>زوج النبي ﷺ وأفقه نساء الأمة<br>موضع ذكر فيه: ﴿وَقَرْنَ فِي بُيُوتِكُنَّ﴾ [الأحزاب: 33]",
                "حفصة بنت عمر رضي الله عنها<br><br>زوج النبي ﷺ وحافظة المصحف<br>موضع ذكر فيه: حديث النبي ﷺ: «إنها صوامة قوامة» [سنن الترمذي: 3898]",
                "زينب بنت خزيمة رضي الله عنها<br><br>أم المساكين<br>موضع ذكر فيه: حديث النبي ﷺ: «أسرعكن لحاقاً بي أطولكن يداً» [صحيح مسلم: 2446]",
                "أم سلمة هند بنت أبي أمية رضي الله عنها<br><br>آخر زوجات النبي وفاة<br>موضع ذكر فيه: حديث النبي ﷺ: «اللهم ادخل على أهل بيتي برحمتك» [صحيح مسلم: 637]",
                "زينب بنت جحش رضي الله عنها<br><br>ابنة عمته أميمة<br>موضع ذكر فيه: ﴿فَلَمَّا قَضَى زَيْدٌ مِّنْهَا وَطَرًا زَوَّجْنَاكَهَا﴾ [الأحزاب: 37]",
                "جويرية بنت الحارث رضي الله عنها<br><br>أعتق الله بسببها مئة من قومها<br>موضع ذكر فيه: حديث النبي ﷺ: «لقد أعتق بها مائة أهل بيت من بني المصطلق» [صحيح مسلم: 1365]",
                "أم حبيبة رملة بنت أبي سفيان رضي الله عنها<br><br>هاجرت إلى الحبشة مرتين<br>موضع ذكر فيه: حديث النبي ﷺ: «من صلى أربعاً قبل الظهر لم تمسه النار» [سنن الترمذي: 428]",
                "صفية بنت حيي رضي الله عنها<br><br>ابنة سيد بني النضير<br>موضع ذكر فيه: حديث النبي ﷺ: «إنها من أهل الجنة» [المستدرك للحاكم: 7310]",
                "ميمونة بنت الحارث رضي الله عنها<br><br>آخر من تزوجها النبي ﷺ<br>موضع ذكر فيه: ﴿وَامْرَأَةً مُّؤْمِنَةً إِن وَهَبَتْ نَفْسَهَا لِلنَّبِيِّ﴾ [الأحزاب: 50]",

                // ========== أبناء النبي ﷺ ==========
                "القاسم بن محمد ﷺ<br><br>أول أبناء النبي من خديجة<br>موضع ذكر فيه: كنيته ﷺ (أبو القاسم) نسبة إليه [سنن أبي داود: 4975]",
                "عبد الله بن محمد ﷺ<br><br>المعروف بالطيب والطاهر<br>موضع ذكر فيه: «ولد له من خديجة قبل البعثة القاسم وعبد الله» [السيرة النبوية لابن هشام]",
                "إبراهيم بن محمد ﷺ<br><br>ابنه من مارية القبطية<br>موضع ذكر فيه: حديث النبي ﷺ عند وفاته: «إن له مرضعاً في الجنة» [صحيح البخاري: 1381]",

                // ========== بنات النبي ﷺ ==========
                "فاطمة الزهراء رضي الله عنها<br><br>أحب الناس إلى النبي ﷺ<br>موضع ذكر فيه: ﴿إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ﴾ [الأحزاب: 33]",
                "زينب بنت محمد ﷺ<br><br>ابنة النبي الكبرى وزوجة أبي العاص<br>موضع ذكر فيه: حديث النبي ﷺ: «أول من تلحق بي من أهلي زينب» [مسند أحمد: 12533]",
                "رقية بنت محمد ﷺ<br><br>ابنة النبي وزوج عثمان<br>موضع ذكر فيه: حديث النبي ﷺ عند وفاتها: «الحقي بسلفنا عثمان» [سنن الترمذي: 3871]",
                "أم كلثوم بنت محمد ﷺ<br><br>ابنة النبي وزوج عثمان بعد رقية<br>موضع ذكر فيه: حديث النبي ﷺ: «لو كانت عندي ثالثة لزوجتها عثمان» [سنن الترمذي: 3871]",

                // ========== الأعمام والعمات ==========
                "العباس بن عبد المطلب رضي الله عنه<br><br>عم النبي ﷺ وآخر من مات من أعمامه<br>موضع ذكر فيه: حديث النبي ﷺ: «هذا العباس أجود قريش كفاً» [المستدرك للحاكم: 4813]",
                "حمزة بن عبد المطلب رضي الله عنه<br><br>عم النبي وأسد الله<br>موضع ذكر فيه: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ﴾ [البقرة: 207]",
                "أبو طالب بن عبد المطلب<br><br>عم النبي وكافله<br>موضع ذكر فيه: قول النبي ﷺ: «أهون أهل النار عذاباً أبو طالب» [صحيح البخاري: 3885]",
                "صفية بنت عبد المطلب رضي الله عنها<br><br>عمة النبي ﷺ وأم الزبير<br>موضع ذكر فيه: حديث النبي ﷺ يوم أحد: «اشهدوا أن عمتي صفية شهيدة» [المصنف لابن أبي شيبة: 37123]",
                "أروى بنت عبد المطلب رضي الله عنها<br><br>عمة النبي ﷺ<br>موضع ذكر فيه: من المهاجرات الأول [الإصابة لابن حجر: 8/20]",

                // ========== أحفاد النبي ﷺ ==========
                "الحسن بن علي رضي الله عنهما<br><br>سبط النبي ﷺ وإمام المسلمين<br>موضع ذكر فيه: حديث النبي ﷺ: «ابني هذا سيد» [صحيح البخاري: 3744]",
                "الحسين بن علي رضي الله عنهما<br><br>سبط النبي ﷺ وسيد شباب الجنة<br>موضع ذكر فيه: حديث النبي ﷺ: «حسين مني وأنا من حسين» [سنن الترمذي: 3775]",
                "زينب بنت علي رضي الله عنها<br><br>ابنة علي وفاطمة<br>موضع ذكر فيه: حديث النبي ﷺ: «فاطمة بضعة مني» [صحيح البخاري: 3714]",
                "أم كلثوم بنت علي رضي الله عنها<br><br>ابنة علي وفاطمة<br>موضع ذكر فيه: حديث النبي ﷺ في فضل ذرية فاطمة [صحيح مسلم: 2426]",
                "المحسن بن علي رضي الله عنه<br><br>الابن الثالث لعلي وفاطمة (على خلاف)<br>موضع ذكر فيه: روايات في استشهاده صغيراً [تاريخ الطبري: 2/230]",

                // ========== آل العباس ==========
                "عبد الله بن العباس رضي الله عنهما<br><br>حبر الأمة وترجمان القرآن<br>موضع ذكر فيه: حديث النبي ﷺ: «اللهم فقهه في الدين» [صحيح البخاري: 143]",
                "الفضل بن العباس رضي الله عنه<br><br>صحابي جليل<br>موضع ذكر فيه: حديث النبي ﷺ في حجة الوداع [صحيح البخاري: 1851]",

                // ========== آل جعفر الطيار ==========
                "عبد الله بن جعفر رضي الله عنه<br><br>ابن جعفر الطيار<br>موضع ذكر فيه: حديث النبي ﷺ: «أشبهت خلقي وخلقي» [مسند أحمد: 1663]",
                "محمد بن جعفر رضي الله عنه<br><br>ابن جعفر الطيار<br>موضع ذكر فيه: حديث النبي ﷺ في فضل آل جعفر [سنن أبي داود: 1667]",
                "عون بن جعفر رضي الله عنه<br><br>صحابي جليل<br>موضع ذكر فيه: شهد صفين مع علي [الإصابة لابن حجر: 5/87]",

                // ========== آل علي رضي الله عنه ==========
                "محمد بن الحنفية رضي الله عنه<br><br>ابن علي من خولة الحنفية<br>موضع ذكر فيه: من كبار التابعين [سير أعلام النبلاء: 4/140]",

                // ========== ذرية الحسن والحسين ==========
                "زيد بن الحسن رضي الله عنه<br><br>حفيد النبي ﷺ<br>موضع ذكر فيه: من أعلام بني هاشم [تاريخ دمشق لابن عساكر: 19/386]",
                "علي زين العابدين رضي الله عنه<br><br>حفيد الحسين وإمام أهل البيت<br>موضع ذكر فيه: حديث النبي ﷺ في فضل الذرية [مسند أحمد: 1715]",

                // ========== مارية القبطية ==========
                "مارية القبطية رضي الله عنها<br><br>أم إبراهيم ولدت للنبي ﷺ<br>موضع ذكر فيه: ذكرها في كتب السيرة [الطبقات الكبرى لابن سعد: 1/134]"],
            gazawatList: [
                "غزوة الأبواء (ودان)<br><br>عدد المسلمين: 60<br>عدد المشركين: غير معروف (قبيلة قريش وبني ضمرة)<br>التاريخ: صفر سنة 2 هـ<br>النتيجة: معاهدة صلح مع بني ضمرة<br>الشهداء: لا يوجد<br>ملاحظات: أول غزوة للنبي ﷺ",
                "غزوة بواط<br><br>عدد المسلمين: 200<br>عدد المشركين: 100 (قريش بقيادة أمية بن خلف)<br>التاريخ: ربيع الأول سنة 2 هـ<br>النتيجة: لم يحدث قتال<br>الشهداء: لا يوجد",
                "غزوة العشيرة<br><br>عدد المسلمين: 150<br>عدد المشركين: غير معروف (قريش)<br>التاريخ: جمادى الأولى سنة 2 هـ<br>النتيجة: معاهدة مع بني مدلج<br>الشهداء: لا يوجد",
                "غزوة بدر الكبرى<br><br>عدد المسلمين: 313<br>عدد المشركين: 950 (قريش)<br>التاريخ: 17 رمضان سنة 2 هـ<br>النتيجة: انتصار ساحق للمسلمين<br>الشهداء: 14 شهيداً<br>ملاحظات: قُتل 70 من المشركين وأسر 70",
                "غزوة بني قينقاع<br><br>عدد المسلمين: غير محدد<br>عدد المشركين: غير معروف (يهود بني قينقاع)<br>التاريخ: شوال سنة 2 هـ<br>النتيجة: إجلاء اليهود عن المدينة<br>الشهداء: لا يوجد",
                "غزوة السويق<br><br>عدد المسلمين: 200<br>عدد المشركين: 200 (أبو سفيان وقريش)<br>التاريخ: ذو الحجة سنة 2 هـ<br>النتيجة: انسحاب المشركين<br>الشهداء: لا يوجد",
                "غزوة بني النضير<br><br>عدد المسلمين: غير محدد<br>عدد المشركين: غير معروف (يهود بني النضير)<br>التاريخ: ربيع الأول سنة 4 هـ<br>النتيجة: إجلاء اليهود عن المدينة<br>الشهداء: لا يوجد",
                "غزوة ذات الرقاع<br><br>عدد المسلمين: 400<br>عدد المشركين: غير معروف (بني ثعلبة وبني محارب)<br>التاريخ: محرم سنة 5 هـ<br>النتيجة: انسحاب الأعداء<br>الشهداء: لا يوجد",
                "غزوة الخندق (الأحزاب)<br><br>عدد المسلمين: 3000<br>عدد المشركين: 10000 (قريش وحلفاؤها)<br>التاريخ: شوال سنة 5 هـ<br>النتيجة: انتصار المسلمين<br>الشهداء: 6 شهداء<br>ملاحظات: استمرت 27 يوماً",
                "غزوة بني قريظة<br><br>عدد المسلمين: 3000<br>عدد المشركين: غير معروف (يهود بني قريظة)<br>التاريخ: ذو القعدة سنة 5 هـ<br>النتيجة: استسلام اليهود<br>الشهداء: لا يوجد",
                "غزوة بني المصطلق<br><br>عدد المسلمين: 700<br>عدد المشركين: غير معروف (بني المصطلق)<br>التاريخ: شعبان سنة 6 هـ<br>النتيجة: انتصار المسلمين<br>الشهداء: لا يوجد",
                "صلح الحديبية<br><br>عدد المسلمين: 1400-1500<br>عدد المشركين: غير معروف (قريش)<br>التاريخ: ذو القعدة سنة 6 هـ<br>النتيجة: صلح لمدة 10 سنوات<br>الشهداء: لا يوجد",
                "غزوة خيبر<br><br>عدد المسلمين: 1600<br>عدد المشركين: غير معروف (يهود خيبر)<br>التاريخ: محرم سنة 7 هـ<br>النتيجة: انتصار المسلمين<br>الشهداء: 20 شهيداً",
                "فتح مكة<br><br>عدد المسلمين: 10000<br>عدد المشركين: غير معروف (قريش)<br>التاريخ: 20 رمضان سنة 8 هـ<br>النتيجة: فتح مكة بدون قتال<br>الشهداء: شهيدان",
                "غزوة حنين<br><br>عدد المسلمين: 12000<br>عدد المشركين: 4000 (هوزان وثقيف)<br>التاريخ: شوال سنة 8 هـ<br>النتيجة: انتصار المسلمين<br>الشهداء: 4 شهداء",
                "غزوة الطائف<br><br>عدد المسلمين: 12000<br>عدد المشركين: غير معروف (ثقيف)<br>التاريخ: شوال سنة 8 هـ<br>النتيجة: لم يحقق النصر الكامل<br>الشهداء: 12 شهيداً",
                "غزوة تبوك<br><br>عدد المسلمين: 30000<br>عدد المشركين: غير معروف (الروم وحلفاؤهم)<br>التاريخ: رجب سنة 9 هـ<br>النتيجة: انسحاب العدو<br>الشهداء: لا يوجد"
            ],
            prophetsList: [
                "آدم عليه السلام<br><br>ذكر في القرآن 25 مرة<br>موضع ذكر فيه: ﴿إِنَّ اللَّهَ اصْطَفَىٰ آدَمَ وَنُوحًا وَآلَ إِبْرَاهِيمَ وَآلَ عِمْرَانَ عَلَى الْعَالَمِينَ﴾ [آل عمران: 33]",
                "إدريس عليه السلام<br><br>ذكر في القرآن مرتين<br>موضع ذكر فيه: ﴿وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا﴾ [مريم: 56]",
                "نوح عليه السلام<br><br>ذكر في القرآن 43 مرة<br>موضع ذكر فيه: ﴿إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنذِرْ قَوْمَكَ﴾ [نوح: 1]",
                "هود عليه السلام<br><br>ذكر في القرآن 7 مرات<br>موضع ذكر فيه: ﴿وَإِلَىٰ عَادٍ أَخَاهُمْ هُودًا قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ﴾ [الأعراف: 65]",
                "صالح عليه السلام<br><br>ذكر في القرآن 9 مرات<br>موضع ذكر فيه: ﴿وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَالِحًا قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ﴾ [الأعراف: 73]",
                "إبراهيم عليه السلام<br><br>ذكر في القرآن 69 مرة<br>موضع ذكر فيه: ﴿إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا﴾ [النحل: 120]",
                "لوط عليه السلام<br><br>ذكر في القرآن 27 مرة<br>موضع ذكر فيه: ﴿وَلُوطًا إِذْ قَالَ لِقَوْمِهِ أَتَأْتُونَ الْفَاحِشَةَ﴾ [النمل: 54]",
                "إسماعيل عليه السلام<br><br>ذكر في القرآن 12 مرة<br>موضع ذكر فيه: ﴿وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ﴾ [مريم: 54]",
                "إسحاق عليه السلام<br><br>ذكر في القرآن 17 مرة<br>موضع ذكر فيه: ﴿وَبَشَّرْنَاهُ بِإِسْحَاقَ نَبِيًّا مِّنَ الصَّالِحِينَ﴾ [الصافات: 112]",
                "يعقوب عليه السلام<br><br>ذكر في القرآن 16 مرة<br>موضع ذكر فيه: ﴿أَمْ كُنتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ﴾ [البقرة: 133]",
                "يوسف عليه السلام<br><br>ذكر في القرآن 27 مرة<br>موضع ذكر فيه: ﴿نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ﴾ [يوسف: 3]",
                "أيوب عليه السلام<br><br>ذكر في القرآن 4 مرات<br>موضع ذكر فيه: ﴿وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ﴾ [الأنبياء: 83]",
                "شعيب عليه السلام<br><br>ذكر في القرآن 11 مرة<br>موضع ذكر فيه: ﴿وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ﴾ [الأعراف: 85]",
                "موسى عليه السلام<br><br>ذكر في القرآن 136 مرة<br>موضع ذكر فيه: ﴿وَهَلْ أَتَاكَ حَدِيثُ مُوسَىٰ﴾ [طه: 9]",
                "هارون عليه السلام<br><br>ذكر في القرآن 20 مرة<br>موضع ذكر فيه: ﴿وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا﴾ [مريم: 53]",
                "داود عليه السلام<br><br>ذكر في القرآن 16 مرة<br>موضع ذكر فيه: ﴿وَاذْكُرْ عَبْدَنَا دَاوُودَ ذَا الْأَيْدِ إِنَّهُ أَوَّابٌ﴾ [ص: 17]",
                "سليمان عليه السلام<br><br>ذكر في القرآن 17 مرة<br>موضع ذكر فيه: ﴿وَوَهَبْنَا لِدَاوُودَ سُلَيْمَانَ نِعْمَ الْعَبْدُ إِنَّهُ أَوَّابٌ﴾ [ص: 30]",
                "إلياس عليه السلام<br><br>ذكر في القرآن مرتين<br>موضع ذكر فيه: ﴿وَإِنَّ إِلْيَاسَ لَمِنَ الْمُرْسَلِينَ﴾ [الصافات: 123]",
                "اليسع عليه السلام<br><br>ذكر في القرآن مرتين<br>موضع ذكر فيه: ﴿وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ﴾ [ص: 48]",
                "يونس عليه السلام<br><br>ذكر في القرآن 4 مرات<br>موضع ذكر فيه: ﴿وَإِنَّ يُونُسَ لَمِنَ الْمُرْسَلِينَ﴾ [الصافات: 139]",
                "زكريا عليه السلام<br><br>ذكر في القرآن 7 مرات<br>موضع ذكر فيه: ﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا﴾ [مريم: 2]",
                "يحيى عليه السلام<br><br>ذكر في القرآن 5 مرات<br>موضع ذكر فيه: ﴿يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ﴾ [مريم: 7]",
                "عيسى عليه السلام<br><br>ذكر في القرآن 25 مرة<br>موضع ذكر فيه: ﴿إِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ يُبَشِّرُكِ بِكَلِمَةٍ مِّنْهُ اسْمُهُ الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ﴾ [آل عمران: 45]",
                "محمد ﷺ<br><br>ذكر في القرآن 4 مرات<br>موضع ذكر فيه: ﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ﴾ [آل عمران: 144]"
            ],
            alowEl3azmList: [
                // التعريف أولاً
                "أولو العزم من الرسل<br><br>هم أصحاب الصبر والثبات والعزيمة القوية في تبليغ الرسالة<br>المصدر: ﴿فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ﴾ [الأحقاف: 35]",

                // الأنبياء أولو العزم
                "نوح عليه السلام<br><br>أول رسول إلى الأرض بعد آدم<br>المصدر: ﴿إِنَّا أَوْحَيْنَا إِلَيْكَ كَمَا أَوْحَيْنَا إِلَىٰ نُوحٍ وَالنَّبِيِّينَ مِن بَعْدِهِ﴾ [النساء: 163]",
                "إبراهيم عليه السلام<br><br>أبو الأنبياء وصاحب المحنة الكبرى<br>المصدر: ﴿وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ فَأَتَمَّهُنَّ﴾ [البقرة: 124]",
                "موسى عليه السلام<br><br>كليم الله وصاحب التوراة<br>المصدر: ﴿وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا﴾ [النساء: 164]",
                "عيسى عليه السلام<br><br>روح الله وكلمته<br>المصدر: ﴿إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ﴾ [النساء: 171]",
                "محمد ﷺ<br><br>خاتم الأنبياء والمرسلين<br>المصدر: ﴿مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ﴾ [الأحزاب: 40]"
            ]
        }
    };

    // توليد بطاقات الفئات
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        appData.categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.dataset.id = category.id;

            categoryCard.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <h3>${category.title}</h3>
                <p>${category.desc}</p>
                <i class="fa-solid fa-square-caret-down"></i>
            `;

            categoriesGrid.appendChild(categoryCard);

            // إضافة حدث النقر لكل بطاقة
            categoryCard.addEventListener('click', function () {
                if (category.list) {
                    openModal(category);
                } else if (category.goto) {
                    window.open(category.goto, '_blank');
                }
            });
        });
    }

    // دالة لفتح المودال
    let scrollPosition = 0;

    function openModal(category) {
        // حفظ موضع التمرير الحالي
        scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // تطبيق النمط لمنع التمرير
        document.body.classList.add('body-no-scroll');
        document.body.style.top = `-${scrollPosition}px`;
        const list = appData.lists[category.list];
        if (!list || list.length === 0) return;

        let currentIndex = 0;

        // إنشاء عناصر المودال
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
        <h2>${category.title}</h2>
        <span class="close-modal"><i class="fa-solid fa-circle-xmark"></i></span>
    `;

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = `<p style="font-size: 25px;">${list[currentIndex]}</p>`;

        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';

        // إنشاء أزرار التنقل كأيقونات
        const prevButton = document.createElement('button');
        prevButton.className = 'nav-btn btn-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        prevButton.style.display = 'none';

        const nextButton = document.createElement('button');
        nextButton.className = 'nav-btn btn-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        if (list.length === 1) nextButton.style.display = 'none';

        const navButtonsContainer = document.createElement('div');
        navButtonsContainer.className = 'nav-buttons-container';
        navButtonsContainer.appendChild(prevButton);
        navButtonsContainer.appendChild(nextButton);

        modalFooter.appendChild(navButtonsContainer);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        // أحداث الأزرار
        nextButton.addEventListener('click', function () {
            if (currentIndex < list.length - 1) {
                currentIndex++;
                modalBody.innerHTML = `<p>${list[currentIndex]}</p>`;
                prevButton.style.display = 'inline-block';
                if (currentIndex === list.length - 1) {
                    nextButton.style.display = 'none';
                }
            }
        });

        prevButton.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                modalBody.innerHTML = `<p>${list[currentIndex]}</p>`;
                nextButton.style.display = 'inline-block';
                if (currentIndex === 0) {
                    prevButton.style.display = 'none';
                }
            }
        });

        // إغلاق المودال
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function () {
            document.body.removeChild(modal);

            document.body.classList.remove('body-no-scroll');
            // العودة إلى موضع التمرير السابق
            window.scrollTo(0, scrollPosition);
            document.body.style.top = '';
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Education Section - Videos
    const videos = [
        { title: "تعلم العقيدة", description: "شرح العقيدة الإسلامية الصحيحة", url: "https://youtu.be/SDvjN1JARso" },
        { title: "الإسلام والإيمان والإحسان", description: "تعلم الفرق بين الإسلام والإيمان والإحسان", url: "https://youtu.be/MX12Dcd5yIo" },
        { title: "مبطلات الإسلام", description: "شرح الأمور التي تخرجك عن الإسلام وتحتاج لتوبة و اعادة الشهادة", url: "https://youtu.be/OmfADuf1tog" },
        { title: "تعلم الوضوء الصحيح", description: "شرح مفصل لكيفية الوضوء الصحيح كما ورد عن الرسول ﷺ", url: "https://youtu.be/zWzAG0NWgBg" },
        { title: "نواقض الوضوء", description: "شرح النواقض التي تفسد الوضوء", url: "https://youtu.be/QgzTxEDUg5A" },
        { title: "تعلم قراءة الفاتحة", description: "شرح مفصل لكيفية قراءة سورة الفاتحة الواجبة على كل مسلم", url: "https://youtu.be/lPat3K8s-0E" },
        { title: "تعلم الصلاة الصحيح", description: "شرح مفصل لكيفية الصلاة الصحيحة كما ورد عن الرسول ﷺ", url: "https://youtu.be/sU4JIFbPhDI" },
        { title: "مبطلات الصلاة", description: "شرح مفصل لمبطلات و نواقض الصلاة التي تفسد الصلاة", url: "https://youtu.be/eJ4ThJT0E5Y" },
        { title: "أنواع الصلاوات", description: "أنواع الصلاوات والنوافل مثل صلاة الإستسقاء و الكسوف وغيرها .", url: "https://youtu.be/r4isxvw-6gw" },
        { title: "تعلم صلاة العيد", description: "تعلم كيفية صلاة العيد بالطريقة الصحيحة", url: "https://youtu.be/gLraJZDlwOI" },
        { title: "تعلم صلاة الإستسقاء", description: "تعلم كيفية صلاة الإستسقاء بالطريقة الصحيحة", url: "https://youtu.be/8K7uc9zDt8Y" },
        { title: "تعلم صلاة الإستخارة", description: "تعلم كيفية صلاة الإستخارة بالطريقة الصحيحة", url: "https://youtu.be/ZfJTX3vglnI" },
        { title: "تعلم صلاة القيام", description: "تعلم كيفية صلاة قيام الليل بالطريقة الصحيحة", url: "https://youtu.be/CGLFuNczYb4" },
        { title: "تعلم صلاة الخسوف و الكسوف", description: "تعلم كيفية صلاة الخسوف و الكسوف بالطريقة الصحيحة", url: "https://youtu.be/-QTI-DAad1Y" },
        { title: "تعلم صلاة الضحى", description: "تعلم كيفية صلاة الضحى بالطريقة الصحيحة", url: "https://youtu.be/ceLTwWsrZY4" },
        { title: "تعلم صلاة التوبة", description: "تعلم كيفية صلاة التوبة بالطريقة الصحيحة", url: "https://youtu.be/fAEQ_AvfYww" },
        { title: "تعلم صلاة الجنازة", description: "تعلم كيفية صلاة الجنازة بالطريقة الصحيحة", url: "https://youtu.be/Xd7yrMbBhI8" },
        { title: "تعلم صلاة الغائب", description: "تعلم كيفية صلاة الغائب بالطريقة الصحيحة", url: "https://youtu.be/WRV_dTt5YrA" },
        { title: "تعلم صلاة المريض", description: "تعلم كيفية صلاة المريض بالطريقة الصحيحة", url: "https://youtu.be/5Z--hAk2gXE" },
        { title: "شروط الجمع والقصر", description: "ما هي شروط الجمع والقصر في الصلاوات", url: "https://youtu.be/vVLCpK9_kKI" },
        { title: "شروط جمع التقديم", description: "ما هي شروط جمع التقديم في الصلاوات", url: "https://youtu.be/D5nz3efmq8U" },
        { title: "شروط جمع التاخير", description: "ما هي شروط جمع التاخير في الصلاوات", url: "https://youtu.be/-ltnJ2MEf5M" },
        { title: "أخلاقيات المسلم", description: "الأخلاق الإسلامية في التعاملات اليومية", url: "https://youtu.be/zzWhkMWlIo0" },
        { title: "الزكاة وأحكامها", description: "شرح تفصيلي لأحكام الزكاة وحسابها", url: "https://youtu.be/NyPugm_OXSQ" },
        { title: "زكاة الفطر", description: "شرح مفصل لزكاة الفطر", url: "https://youtu.be/m_WN7fn9in4" },
        { title: "الصيام الصحيح", description: "أحكام وفضائل الصيام في رمضان وغيره", url: "https://youtu.be/f21Y7xSrHeI" },
        { title: "بر الوالدين", description: "فضل وأهمية بر الوالدين في الإسلام", url: "https://youtu.be/NpTK1te_2rg" },
        { title: "آداب التعامل مع القرآن", description: "الآداب الشرعية في التعامل مع المصحف", url: "https://youtu.be/5lwpCAv_zQM" },
        { title: "السيرة النبوية", description: "السيرة النبوية للرسول ﷺ من ولادته الي بعثته", url: "https://youtu.be/x8cfDQOz2BM" },
        { title: "مناسك الحج", description: "تعلم كيفية أداء مناسك الحج كما ورد عن الرسول", url: "https://youtu.be/hb2KwtxJpj8" },
        { title: "مناسك العمرة", description: "تعلم كيفية أداء مناسك العمرة كما ورد عن الرسول", url: "https://youtu.be/gWuxWTlnKE4" },
        { title: "غزوات الرسول ", description: "جميع غزوات النبي محمد ﷺ وبعض تفاصيلها", url: "https://youtu.be/gNEnNdXhOr8" },
        { title: "علامات الساعة", description: "علامة الساعة الكبرى بالترتيب من البداية للنهاية", url: "https://youtu.be/Iece8LS_cWA" },
        { title: "تعلم أحكام التجويد", description: "شرح مفصل لأحكام التجويد بطريقة عملية مبسطة", url: "https://youtu.be/Q-vJEf58Zq4" },
        { title: "قصة سيدنا عيسى", description: "قصة سيدنا عيسى بالتفصيل من القرآن والانجيل", url: "https://youtu.be/a-ipt1l19EM" },
        { title: "قصة سيدنا أبوبكر", description: "قصة سيدنا أبوبكر خير البشر بعد الرسل كاملة ", url: "https://youtu.be/VSypNjjHGO8" },
        { title: "معجزات علمية في القرآن", description: "11 دليلاً على صحة الإسلام حقائق علمية", url: "https://youtu.be/bAKsAh9MxQk" },
        { title: "29 بصيرة عقلية وعلمية", description: "29 بصيرة عقلية وعلمية في النفس والكون", url: "https://youtu.be/Km052ZmGDN4" },
        { title: "الرد على أشهر 71", description: "أكبر موسوعة صوتية في الرد على شبهات الملحدين والمشككين", url: "https://youtu.be/zw5hDAbYNgY" },
    ];

    const videoContainer = document.getElementById("videoContainer");
    let activeVideos = {};

    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    loadYouTubeAPI();

    function getVideoId(url) {
        if (!url || typeof url !== 'string') return '';

        if (!url.includes('youtu')) return '';

        let videoId = '';

        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1];
        } else if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1];
        }

        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        return videoId;
    }

    function getThumbnailUrl(videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    videos.forEach((video, index) => {
        const videoId = getVideoId(video.url);
        let thumbnailHTML = '';

        if (videoId) {
            const thumbnailUrl = getThumbnailUrl(videoId);
            thumbnailHTML = `
                <div class="thumbnail-overlay">
                    <i class="fa-solid fa-circle-play" data-index="${index}"></i>
                </div>
                <img src="${thumbnailUrl}" alt="${video.title}" class="thumbnail-image">
            `;
        } else {
            thumbnailHTML = `<i class="fa-solid fa-circle-play" data-index="${index}"></i>`;
        }

        const item = document.createElement("div");
        item.className = "video-item";
        item.innerHTML = `
            <div class="video-thumbnail" data-video-id="${videoId}" data-index="${index}">
                ${thumbnailHTML}
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>`;
        videoContainer.appendChild(item);

        const thumbnailContainer = item.querySelector('.video-thumbnail');
        thumbnailContainer.style.position = 'relative';
        thumbnailContainer.style.overflow = 'hidden';
        thumbnailContainer.style.cursor = 'pointer';

        const thumbnailImage = thumbnailContainer.querySelector('.thumbnail-image');
        if (thumbnailImage) {
            thumbnailImage.style.width = '100%';
            thumbnailImage.style.height = '100%';
            thumbnailImage.style.objectFit = 'cover';
        }

        const overlay = thumbnailContainer.querySelector('.thumbnail-overlay');
        if (overlay) {
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            overlay.style.transition = 'all 0.3s ease';
        }

        const playIcon = thumbnailContainer.querySelector('.fa-circle-play');
        if (playIcon) {
            playIcon.style.fontSize = '3rem';
            playIcon.style.color = 'white';
            playIcon.style.opacity = '0.9';
        }

        if (overlay) {
            thumbnailContainer.addEventListener('mouseover', () => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.89)';
                if (playIcon) playIcon.style.transform = 'scale(1.3)';
                playIcon.style.color = 'red';
            });

            thumbnailContainer.addEventListener('mouseout', () => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                if (playIcon) playIcon.style.transform = 'scale(1)';
                playIcon.style.color = 'white';
            });
        }
    });

    function pauseAllVideosExcept(exceptIndex) {
        Object.keys(activeVideos).forEach(index => {
            if (parseInt(index) !== exceptIndex) {
                const player = activeVideos[index];
                if (player && typeof player.pauseVideo === 'function') {
                    player.pauseVideo();
                }
            }
        });
    }

    function addClickListenerToPlayIcon(playIcon) {
        playIcon.addEventListener("click", playVideo);
    }

    // دالة لإيقاف جميع الفيديوهات
    function pauseAllVideos() {
        Object.keys(activeVideos).forEach(index => {
            const player = activeVideos[index];
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        });
    }

    // تعديل دالة تشغيل الفيديو لإيقاف البث الصوتي
    function playVideo() {
        // إيقاف البث الصوتي إذا كان يعمل
        if (isPlaying) {
            pausePlayer();
        }

        // الكود الأصلي لتشغيل الفيديو
        const videoIndex = parseInt(this.getAttribute("data-index"));
        const thumbnailContainer = this.closest('.video-thumbnail');
        const videoId = thumbnailContainer.getAttribute('data-video-id');

        if (videoId) {
            if (activeVideos[videoIndex]) {
                pauseAllVideosExcept(videoIndex);
                activeVideos[videoIndex].playVideo();
                currentlyPlayingIndex = videoIndex;
                return;
            }

            pauseAllVideosExcept(videoIndex);

            const videoElement = document.createElement('div');
            videoElement.id = `youtube-player-${videoIndex}`;
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';

            const originalContent = thumbnailContainer.innerHTML;
            thumbnailContainer.setAttribute('data-original-content', originalContent);

            thumbnailContainer.innerHTML = '';
            thumbnailContainer.appendChild(videoElement);

            if (typeof YT !== 'undefined' && YT.Player) {
                createYouTubePlayer(videoId, videoIndex, videoElement.id);
            } else {
                window.onYouTubeIframeAPIReady = function () {
                    createYouTubePlayer(videoId, videoIndex, videoElement.id);
                };
            }
        } else {
            console.error("معرف الفيديو غير صالح للفيديو رقم:", videoIndex);
        }
    }

    function createYouTubePlayer(videoId, videoIndex, elementId) {
        activeVideos[videoIndex] = new YT.Player(elementId, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onReady': function (event) {
                    event.target.playVideo();
                    currentlyPlayingIndex = videoIndex;
                },
                'onStateChange': function (event) {
                    if (event.data === YT.PlayerState.PLAYING) {
                        pauseAllVideosExcept(videoIndex);
                    }
                    if (event.data === YT.PlayerState.ENDED) {
                        // Optional: resetThumbnail(videoIndex);
                    }
                }
            }
        });
    }

    document.querySelectorAll(".video-thumbnail").forEach(container => {
        container.addEventListener("click", function (e) {
            if (e.target === this || e.target.classList.contains('thumbnail-image') || e.target.classList.contains('thumbnail-overlay')) {
                const playIcon = this.querySelector('.fa-circle-play');
                if (playIcon) {
                    playIcon.click();
                } else if (this.hasAttribute('data-index')) {
                    const videoIndex = parseInt(this.getAttribute('data-index'));
                    if (activeVideos[videoIndex]) {
                        pauseAllVideosExcept(videoIndex);
                        activeVideos[videoIndex].playVideo();
                        currentlyPlayingIndex = videoIndex;
                    }
                }
            }
        });
    });

    document.querySelectorAll(".fa-circle-play").forEach(playIcon => {
        addClickListenerToPlayIcon(playIcon);
    });
});