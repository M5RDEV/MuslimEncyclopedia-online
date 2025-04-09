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
            } else {
                // If it's currently visible, hide it
                targetContent.style.display = 'none';
                targetContent.classList.add('hidden-content');
                this.textContent = this.textContent.replace('إخفاء', 'عرض');
            }
        });
    });

    // Quiz Modal
    const quizBtn = document.querySelector('.floating-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const closeQuizBtn = quizModal.querySelector('.close-modal');

    quizBtn.addEventListener('click', function () {
        quizModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeQuizBtn.addEventListener('click', function () {
        quizModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Handle quiz functionality
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizNextBtn = document.getElementById('quiz-next');

    // Quiz questions array
    const quizQuestions = [
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
            question: "يأتي القرآن الكريم يوم القيامة : ........",
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
            question: "شبه رسول الله ﷺ قارئ القرآن ب : ........",
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
            question: "يرجع نسب رسول الله ﷺ إلى: ........",
            options: [
                { text: "مديان بن ابراهيم", correct: false },
                { text: "اسحاق بن ابراهيم", correct: false },
                { text: "كيسان بن ابراهيم", correct: false },
                { text: "اسماعيل بن ابراهيم", correct: true }
            ]
        },
        {
            question: "من معاني النبوة في اللغة: ........",
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
            question: "من أعمام رسول الله ﷺ: ........",
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
            question: "سيدنا محمد ﷺ هو محمد بن عبدالله بن ........",
            options: [
                { text: "بن هاشم بن عبد مناف بن قصي", correct: false },
                { text: "بن عبد المطلب بن عبد مناف بن هاشم", correct: false },
                { text: "بن أبي طالب بن هاشم بن عبد مناف", correct: false },
                { text: "بن عبد المطلب بن هاشم بن عبد مناف", correct: true }
            ]
        },
        {
            question: "أمتد ذرية رسول الله ﷺ من نسل: ........",
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
        }
    ];

    let currentQuestionIndex = 0;
    let selectedOption = null;
    let quizAnswered = false;

    // Initialize quiz
    function loadQuestion(index) {
        const question = quizQuestions[index];
        document.getElementById('quiz-question').textContent = question.question;

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option.text;
            if (option.correct) {
                optionElement.dataset.correct = 'true';
            }

            optionElement.addEventListener('click', function () {
                if (quizAnswered) return;

                // Remove previous selection
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Select this option
                this.classList.add('selected');
                selectedOption = this;
                checkAnswer();
            });

            optionsContainer.appendChild(optionElement);
        });

        // Update progress
        document.getElementById('quiz-progress').textContent = `${index + 1} / ${quizQuestions.length}`;

        // Reset state
        quizFeedback.style.display = 'none';
        quizFeedback.className = 'quiz-feedback';
        quizNextBtn.disabled = true;
        quizAnswered = false;
        selectedOption = null;
    }

    function checkAnswer() {
        if (!selectedOption) return;

        quizAnswered = true;
        const isCorrect = selectedOption.hasAttribute('data-correct');

        if (isCorrect) {
            selectedOption.classList.add('correct');
            quizFeedback.textContent = 'أحسنت! إجابة صحيحة';
            quizFeedback.classList.add('correct');
        } else {
            selectedOption.classList.add('wrong');
            quizFeedback.textContent = 'للأسف، إجابة خاطئة';
            quizFeedback.classList.add('wrong');

            // Highlight correct answer
            document.querySelectorAll('.quiz-option').forEach(opt => {
                if (opt.hasAttribute('data-correct')) {
                    opt.classList.add('correct');
                }
            });
        }

        quizFeedback.style.display = 'block';
        quizNextBtn.disabled = false;
    }

    // Load initial question
    loadQuestion(currentQuestionIndex);

    // Handle next question button
    quizNextBtn.addEventListener('click', function () {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            // Quiz finished
            document.getElementById('quiz-question').textContent = 'انتهى الاختبار!';
            document.getElementById('quiz-options').innerHTML = '';
            quizFeedback.textContent = 'شكراً لمشاركتك، نتمنى أن تكون استفدت';
            quizFeedback.className = 'quiz-feedback correct';
            quizFeedback.style.display = 'block';
            quizNextBtn.disabled = true;

            // Add restart button
            const restartBtn = document.createElement('button');
            restartBtn.className = 'quiz-btn';
            restartBtn.textContent = 'إعادة الاختبار';
            restartBtn.addEventListener('click', function () {
                currentQuestionIndex = 0;
                loadQuestion(currentQuestionIndex);
            });

            document.querySelector('.quiz-navigation').appendChild(restartBtn);
        }
    });

    // Video Modal
    const videoModal = document.getElementById('video-modal');
    const minimizedVideo = document.getElementById('minimized-video');
    let player = null;

    // Click event for open video button
    const openVideoButtons = document.querySelectorAll('.open-video');
    openVideoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video');
            openVideoModal(videoId);
        });
    });

    // Click events for view video buttons
    const viewVideoButtons = document.querySelectorAll('.view-video-btn');
    viewVideoButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Default videos for educational content
            const videoIds = ['9ZvNMIvbn0k', 'lFJCdUPfbCw', 'kS3LJ4j8vww'];
            const randomIndex = Math.floor(Math.random() * videoIds.length);
            openVideoModal(videoIds[randomIndex]);
        });
    });

    // Close video modal
    const closeVideoBtn = videoModal.querySelector('.close-modal');
    closeVideoBtn.addEventListener('click', function () {
        closeVideoModal();
    });

    // Minimize video
    const minimizeBtn = videoModal.querySelector('.minimize-video');
    minimizeBtn.addEventListener('click', function () {
        minimizeVideo();
    });

    // Restore minimized video
    const restoreBtn = minimizedVideo.querySelector('.restore-video');
    restoreBtn.addEventListener('click', function () {
        restoreVideo();
    });

    // Close minimized video
    const closeMinimizedBtn = minimizedVideo.querySelector('.close-minimized-video');
    closeMinimizedBtn.addEventListener('click', function () {
        closeMinimizedVideo();
    });

    // Functions for handling video functionality
    function openVideoModal(videoId) {
        // Create YouTube iframe if it doesn't exist
        const playerContainer = document.getElementById('youtube-player');
        playerContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        // Show modal
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        const playerContainer = document.getElementById('youtube-player');
        playerContainer.innerHTML = '';
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function minimizeVideo() {
        videoModal.style.display = 'none';
        minimizedVideo.classList.remove('hidden');
    }

    function restoreVideo() {
        minimizedVideo.classList.add('hidden');
        videoModal.style.display = 'block';
    }

    function closeMinimizedVideo() {
        minimizedVideo.classList.add('hidden');
        closeVideoModal();
    }

    // Close modals when clicking outside of them
    window.addEventListener('click', function (event) {
        if (event.target === quizModal) {
            quizModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === videoModal) {
            closeVideoModal();
        }
    });

    // Function to get prayer times based on current location
    function getPrayerTimes(retry = false) {
        // Only increment retry counter when this is a retry attempt
        if (retry) {
            retryCounter++;
            console.log(`Retry attempt: ${retryCounter} of ${MAX_RETRIES}`);
        } else {
            // Reset counter if this is a fresh attempt (not a retry)
            retryCounter = 0;
        }

        // Check if we've reached the maximum retries
        if (retryCounter >= MAX_RETRIES) {
            console.log("Maximum retry attempts reached. Stopping automatic updates.");
            return; // Exit without scheduling more retries
        }

        // Show loading message
        setAllTimesToLoading();

        // Try to get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Success - got location
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchPrayerTimesFromAPI(latitude, longitude);
                },
                (error) => {
                    // Error getting location - set to 00:00
                    console.error("Error getting location:", error);
                    setAllTimesToDefault();
                    // Schedule retry after 2 minutes
                    scheduleRetry();
                }
            );
        } else {
            // Geolocation not supported - set to 00:00
            console.error("Geolocation not supported by this browser");
            setAllTimesToDefault();
            // Schedule retry after 2 minutes
            scheduleRetry();
        }
    }

    // Maximum number of retry attempts
    const MAX_RETRIES = 20;

    // Counter for retry attempts
    let retryCounter = 0;

    // Set all prayer times to "جاري التحديث"
    function setAllTimesToLoading() {
        const prayerElements = document.querySelectorAll('.prayer-time p');
        prayerElements.forEach(el => {
            el.textContent = "جاري التحديث ...";
        });
    }

    // Set all prayer times to 00:00
    function setAllTimesToDefault() {
        const prayerElements = document.querySelectorAll('.prayer-time p');
        prayerElements.forEach(el => {
            el.textContent = "00:00";
        });
    }

    // Fetch prayer times from API using coordinates
    function fetchPrayerTimesFromAPI(latitude, longitude) {
        // Get current date
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // JS months are 0-indexed
        const year = today.getFullYear();

        // API URL (using Aladhan API)
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
                    // If successful, clear any scheduled retries and reset counter
                    clearScheduledRetry();
                    retryCounter = 0;
                } else {
                    throw new Error("Invalid API response format");
                }
            })
            .catch(error => {
                console.error("Error fetching prayer times:", error);
                // Set to 00:00 if there's an error
                setAllTimesToDefault();
                // Schedule retry after 2 minutes
                scheduleRetry();
            });
    }

    // Update the display with fetched prayer times
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

    // Format time to 12-hour format with Arabic AM/PM
    function formatTimeTo12Hour(timeString) {
        try {
            // Get HH:MM part only
            const timePart = timeString.split(" ")[0];
            const [hours, minutes] = timePart.split(":");

            // Convert to integers
            let hour = parseInt(hours);
            const min = minutes;

            // Determine AM/PM
            const ampm = hour >= 12 ? 'م' : 'ص';

            // Convert to 12-hour format
            hour = hour % 12;
            hour = hour ? hour : 12; // 0 should become 12

            // Return formatted time
            return `${hour}:${min} ${ampm}`;
        } catch (error) {
            console.error("Error formatting time:", error);
            return "00:00";
        }
    }

    // Variable to store the retry timeout ID
    let retryTimeoutId = null;

    // Schedule a retry after 2 minutes
    function scheduleRetry() {
        // Check if we've already reached max retries
        if (retryCounter >= MAX_RETRIES) {
            console.log("Maximum retry attempts reached. No more retries will be scheduled.");
            return;
        }

        // Clear any existing retry timeouts first
        clearScheduledRetry();

        // Set new timeout for 2 minutes (120000 ms)
        console.log("Scheduling retry in 2 minutes...");
        retryTimeoutId = setTimeout(() => {
            console.log("Retrying to fetch prayer times...");
            getPrayerTimes(true); // true indicates this is a retry attempt
        }, 120000);
    }

    // Clear any scheduled retries
    function clearScheduledRetry() {
        if (retryTimeoutId !== null) {
            clearTimeout(retryTimeoutId);
            retryTimeoutId = null;
        }
    }

    // Function to check connection status
    function isOnline() {
        return navigator.onLine;
    }

    // Add event listeners for online/offline events
    window.addEventListener('online', () => {
        console.log("Connection restored. Retrying prayer times...");
        if (retryCounter < MAX_RETRIES) {
            getPrayerTimes(); // Start fresh when connection is restored
        } else {
            console.log("Maximum retry attempts already reached. Manual refresh required.");
        }
    });

    // Function to manually reset retry counter and force update
    function manualRefresh() {
        retryCounter = 0;
        getPrayerTimes();
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', getPrayerTimes);
    // Or initialize immediately if DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        getPrayerTimes();
    }

    //Main Section
    const categories = [
        { id: "Prayer", icon: "🕌", title: "ما يتعلق بالصلاة", desc: "الوضوء و الصلاة و بعض الأخطاء المنتشرة و السن المهجورة فيهم" },
        { id: "hadith", icon: "📜", title: "الأحاديث النبوية", desc: "مجموعة من الأحاديث الصحيحة والحسنة عن رسول الله ﷺ" },
        { id: "azkar", icon: "📿", title: "الأذكار", desc: "أذكار الصباح والمساء وأدعية من القرآن الكريم" },
        { id: "rokya", icon: "📕", title: "الرقية الشرعية", desc: "الرقية الشرعية من القرآن و السنة النبوية" },
        { id: "Fadil", icon: "⭐", title: "فضل بعض العبادات", desc: "الإعجاز العلمي في القرآن الكريم والسنة النبوية" },
        { id: "names", icon: "🕌", title: "أسماء الله الحسنى", desc: "أسماء الله الحسنى الـ99 إسم مع شرح معانيها وفضائلها" },
        { id: "names", icon: "📃", title: "أسماء رسول الله ﷺ", desc: "أسماء رسول الله الصحيحة وشرح معانيها و نسب الرسول ﷺ" },
        { id: "doaa", icon: "🤲", title: "أدعية من القرآن", desc: "مجموعة من الادعية الواردة في القرآن الكريم" },
        { id: "men", icon: "🌟", title: "العشرة المبشرين بالجنة", desc: "جزء من سيرة العشرة المبشرين بالجنة رضوان الله عليهم" },
        { id: "women", icon: "👑", title: "نساء عظيمة في الإسلام", desc: "بعض الصحابيات العظيمات اللواتي خَدَمن الإسلام" },
        { id: "aya", icon: "📖", title: "آية وعبرة", desc: "بعض الآيات و العبرة المستفادة منها" },
        { id: "golden", icon: "🥇", title: "فرص ذهبية", desc: "بعض الفرص الذهبية التي عليك استغلالها" },
        { id: "signs", icon: "🌙", title: "علامات الساعة", desc: "علامات الساعة الصغرى والكبرى مع شرح بسيط لكل علامة" },
        { id: "sunna", icon: "🚫", title: "بعض السنن المهجورة", desc: "بعض السنن المهجورة عن رسول الله ﷺ" },
        { id: "beda3", icon: "❌", title: "بعض البدع المنتشرة", desc: "البدع و الامور المستحدثة في الدين التي لم ترد عن رسول الله ﷺ" },
        { id: "E3ga", icon: "🔎", title: "الإعجاز العلمي", desc: "الإعجاز العلمي في القرآن الكريم والسنة النبوية" },
        { id: "stories", icon: "📚", title: "السيرة النبوية", desc: "جزء من السيرة النبوية والعشرة المبشرين بالجنة" },
        { id: "stories", icon: "🏡", title: "آل بيت الرسول ﷺ", desc: "التعرف على آل البيت: زوجات وأولاد وبنات وآل بيت الرسولﷺ" },
        { id: "gazawat", icon: "🗡️", title: "غزوات الرسول", desc: "الغزوات في عهد الرسول ﷺ وبعض تفاصيلها" },
        { id: "Prophets", icon: "📖", title: "الرسل و الانبياء", desc: "الرسل و الانبياء المذكورين في القرآن و السنة النبوية" },
        { id: "AlowEl3azm", icon: "📃", title: "اولي العزم من الرسل", desc: "الصبر وقوة تحمل المشاق من المرسلين الذين ذكرهم الله في القرآن" }
    ];

    const gridContainer = document.querySelector('.categories-grid');

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.id = category.id;
        card.innerHTML = `
        <div class="category-icon">${category.icon}</div>
        <h3>${category.title}</h3>
        <p>${category.desc}</p>
        <i class="fa-solid fa-square-caret-down"></i>`;
        gridContainer.appendChild(card);
    });

    // Education Section
    const videos = [
        { title: "تعلم العقيدة", description: "شرح العقيدة الإسلامية الصحيحة", url: "https://youtu.be/SDvjN1JARso" },
        { title: "الإسلام والإيمان والإحسان", description: "تعلم الفرق بين الإسلام والإيمان والإحسان", url: "https://youtu.be/MX12Dcd5yIo" },
        { title: "مبطلات الإسلام", description: "شرح الأمور التي تخرجك عن الإسلام وتحتاج لتوبة و اعادة الشهادة", url: "https://youtu.be/OmfADuf1tog" },
        { title: "تعلم الوضوء الصحيح", description: "شرح مفصل لكيفية الوضوء الصحيح كما ورد عن الرسول ﷺ", url: "https://youtu.be/zWzAG0NWgBg" },
        { title: "نواقض الوضوء", description: "شرح النواقض التي تفسد الوضوء", url: "https://youtu.be/QgzTxEDUg5A" },
        { title: "تعلم قراءة الفاتحة", description: "شرح مفصل لكيفية قراءة سورة الفاتحة الواجبة على كل مسلم", url: "https://youtu.be/lPat3K8s-0E" },
        { title: "تعلم الصلاة الصحيح", description: "شرح مفصل لكيفية الصلاة الصحيحة كما ورد عن الرسول ﷺ", url: "https://youtu.be/sU4JIFbPhDI" },
        { title: "مبطلات الصلاة", description: "شرح مفصل لمبطلات و نواقض الصلاة التي تفسد الصلاة", url: "https://youtu.be/eJ4ThJT0E5Y" },
        { title: "أنواع الصلاوات", description: "أنواع الصلاوات والنوافل مثل صلاة الإستسقاء و الكسوف وغيرها ...", url: "https://youtu.be/r4isxvw-6gw" },
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

    // تخزين مراجع الفيديوهات النشطة
    let activeVideos = {};
    let currentlyPlayingIndex = null;

    // إضافة YouTube API
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // استدعاء دالة تحميل API
    loadYouTubeAPI();

    // استخراج معرف الفيديو من رابط يوتيوب
    function getVideoId(url) {
        if (!url || typeof url !== 'string') return '';

        // التحقق من صحة الرابط
        if (!url.includes('youtu')) return '';

        let videoId = '';

        // استخراج معرف الفيديو من الرابط
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1];
        } else if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1];
        }

        // إزالة أي معلمات إضافية من الرابط
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        return videoId;
    }

    // الحصول على رابط الصورة المصغرة من معرف الفيديو
    function getThumbnailUrl(videoId) {
        // استخدام صورة عالية الجودة من يوتيوب
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    videos.forEach((video, index) => {
        const videoId = getVideoId(video.url);
        let thumbnailHTML = '';

        // إذا كان معرف الفيديو صالحًا، نعرض الصورة المصغرة
        if (videoId) {
            const thumbnailUrl = getThumbnailUrl(videoId);
            thumbnailHTML = `
            <div class="thumbnail-overlay">
                <i class="fa-solid fa-circle-play" data-index="${index}"></i>
            </div>
            <img src="${thumbnailUrl}" alt="${video.title}" class="thumbnail-image">
        `;
        } else {
            // إذا لم يكن لدينا معرف فيديو صالح، نعرض أيقونة التشغيل فقط
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

        // إضافة CSS للصورة المصغرة وأيقونة التشغيل
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

        // إضافة تأثير hover للأيقونة
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

    // دالة لإيقاف جميع الفيديوهات باستثناء الفيديو المحدد
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

    // دالة لإضافة مستمع الحدث لأيقونة التشغيل
    function addClickListenerToPlayIcon(playIcon) {
        playIcon.addEventListener("click", playVideo);
    }

    // دالة تشغيل الفيديو
    function playVideo() {
        const videoIndex = parseInt(this.getAttribute("data-index"));
        const thumbnailContainer = this.closest('.video-thumbnail');
        const videoId = thumbnailContainer.getAttribute('data-video-id');

        // إذا كان معرف الفيديو صالحًا
        if (videoId) {
            // إذا كان الفيديو قد تم تحميله مسبقًا، قم بتشغيله
            if (activeVideos[videoIndex]) {
                // إيقاف جميع الفيديوهات الأخرى
                pauseAllVideosExcept(videoIndex);

                // تشغيل الفيديو المحدد
                activeVideos[videoIndex].playVideo();
                currentlyPlayingIndex = videoIndex;
                return;
            }

            // إيقاف جميع الفيديوهات الأخرى
            pauseAllVideosExcept(videoIndex);

            // احفظ أبعاد الحاوية
            const width = thumbnailContainer.offsetWidth;
            const height = thumbnailContainer.offsetHeight;

            // إنشاء عنصر div لاستضافة الفيديو
            const videoElement = document.createElement('div');
            videoElement.id = `youtube-player-${videoIndex}`;
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';

            // حفظ محتوى الحاوية الأصلي
            const originalContent = thumbnailContainer.innerHTML;
            thumbnailContainer.setAttribute('data-original-content', originalContent);

            // استبدل محتوى الحاوية بعنصر الفيديو
            thumbnailContainer.innerHTML = '';
            thumbnailContainer.appendChild(videoElement);

            // إنشاء مشغل يوتيوب
            // تحقق من توفر YouTube API
            if (typeof YT !== 'undefined' && YT.Player) {
                createYouTubePlayer(videoId, videoIndex, videoElement.id);
            } else {
                // إذا لم يكن API جاهزًا بعد، انتظر حتى يصبح جاهزًا
                window.onYouTubeIframeAPIReady = function () {
                    createYouTubePlayer(videoId, videoIndex, videoElement.id);
                };
            }
        } else {
            console.error("معرف الفيديو غير صالح للفيديو رقم:", videoIndex);
        }
    }

    // دالة إنشاء مشغل يوتيوب
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
                    // إذا بدأ التشغيل (بعد توقف مؤقت أو في البداية)
                    if (event.data === YT.PlayerState.PLAYING) {
                        // إيقاف جميع الفيديوهات الأخرى
                        pauseAllVideosExcept(videoIndex);
                    }

                    // إذا انتهى الفيديو، يمكنك إضافة سلوك هنا إذا لزم الأمر
                    if (event.data === YT.PlayerState.ENDED) {
                        // اختياري: إعادة عرض الصورة المصغرة بعد انتهاء الفيديو
                        // resetThumbnail(videoIndex);
                    }
                }
            }
        });
    }

    // دالة اختيارية لإعادة عرض الصورة المصغرة
    function resetThumbnail(videoIndex) {
        const containers = document.querySelectorAll('.video-thumbnail');
        containers.forEach(container => {
            if (parseInt(container.getAttribute('data-index')) === videoIndex) {
                const originalContent = container.getAttribute('data-original-content');
                if (originalContent) {
                    container.innerHTML = originalContent;

                    // إعادة إضافة مستمعات الأحداث
                    const playIcon = container.querySelector('.fa-circle-play');
                    if (playIcon) {
                        addClickListenerToPlayIcon(playIcon);
                    }

                    // إعادة إضافة تأثيرات hover
                    const overlay = container.querySelector('.thumbnail-overlay');
                    if (overlay && playIcon) {
                        container.addEventListener('mouseover', () => {
                            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                            playIcon.style.transform = 'scale(1.1)';
                        });

                        container.addEventListener('mouseout', () => {
                            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                            playIcon.style.transform = 'scale(1)';
                        });
                    }
                }
            }
        });

        // حذف المشغل من القائمة النشطة
        delete activeVideos[videoIndex];
        if (currentlyPlayingIndex === videoIndex) {
            currentlyPlayingIndex = null;
        }
    }

    // إضافة مستمع الحدث لكل thumbnail container
    document.querySelectorAll(".video-thumbnail").forEach(container => {
        container.addEventListener("click", function (e) {
            // إذا تم النقر مباشرة على الحاوية وليس على أيقونة التشغيل
            if (e.target === this || e.target.classList.contains('thumbnail-image') || e.target.classList.contains('thumbnail-overlay')) {
                const playIcon = this.querySelector('.fa-circle-play');
                if (playIcon) {
                    // محاكاة النقر على أيقونة التشغيل
                    playIcon.click();
                } else if (this.hasAttribute('data-index')) {
                    // إذا كان الفيديو موجود بالفعل (تم استبدال أيقونة التشغيل بـ iframe)
                    const videoIndex = parseInt(this.getAttribute('data-index'));
                    if (activeVideos[videoIndex]) {
                        // إيقاف جميع الفيديوهات الأخرى
                        pauseAllVideosExcept(videoIndex);

                        // تشغيل هذا الفيديو
                        activeVideos[videoIndex].playVideo();
                        currentlyPlayingIndex = videoIndex;
                    }
                }
            }
        });
    });

    // إضافة مستمع الحدث لجميع أيقونات التشغيل
    document.querySelectorAll(".fa-circle-play").forEach(playIcon => {
        addClickListenerToPlayIcon(playIcon);
    });
});
