const reciters = [
    {
        name: "القارئ عبدالباسط عبدالصمد",
        img: "img/Abd_Elbasit.png",
        desc: "الحنجرة الذهبية في تلاوت القرآن الكريم",
        identifier: "https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/",
        url: "https://archive.org/download/ABDEL-BASIT.ABDEL-SAMAD.MUJAWAD.FULL.HQ.BY-MAHMOUD-ZIED/ABDEL-BASIT.ABDEL-SAMAD.MUJAWAD.FULL.HQ.BY-MAHMOUD-ZIED_vbr_mp3.zip"
    },
    {
        name: "القارئ محمد المنشـــــــــــــــاوي",
        img: "img/El_Minshwy.png",
        desc: "القارئ الباكي عميد دولة التلاوات",
        identifier: "https://download.tvquran.com/download/TvQuran.com__Al-Minshawi-Mojawad/",
        url: "https://ia801307.us.archive.org/3/items/Al-Minshawy_Muratal_Quran/Al-Minshawy_Muratal_Quran_vbr_mp3.zip"
    },
    {
        name: "القارئ محمود الحـصـــــــــــــــري",
        img: "img/Elhosary.png",
        desc: "شيخ عموم المقارئ المصرية في القراءات",
        identifier: "https://server13.mp3quran.net/husr/",
        url: "https://ia800409.us.archive.org/3/items/Al-Quran_tilawat_Mahmoud_Al-Hosary/Al-Quran_tilawat_Mahmoud_Al-Hosary_vbr_mp3.zip"
    },
    {
        name: "القارئ مشاري العفـاســـــــــــــي",
        img: "img/El3asafi.png",
        desc: "من القراء المعاصرين ذوي الشعبية الكبيرة",
        identifier: "https://server8.mp3quran.net/afs/",
        url: "https://ia801503.us.archive.org/4/items/fm_002_20150413_0654/fm_002_20150413_0654_vbr_mp3.zip"
    },
    {
        name: "القارئ مـــاهــــر المــعــلــيــقـــي",
        img: "img/Maher_Elm3laky.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://server12.mp3quran.net/maher/",
        url: ""
    },
    {
        name: "القارئ فـــــــــــــــــارس عـــبــــــــاد",
        img: "img/Fares_3bad.png",
        desc: "القارئ المعروف بأدائه المتميز للقرآن الكريم",
        identifier: "https://server8.mp3quran.net/frs_a/",
        url: ""
    },
    {
        name: "القارئ عــــــــبـد الله كــــــــامـــــل",
        img: "img/3bdallah_kamel.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server16.mp3quran.net/kamel/Rewayat-Hafs-A-n-Assem/",
        url: ""
    },
    {
        name: "القارئ نـــــــــاصر القـــطـــامــــي",
        img: "img/Nasser_Elqtamy.png",
        desc: "القارئ المعروف بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://server6.mp3quran.net/qtm/",
        url: ""
    },
    {
        name: "القارئ يـــــــــاسر الدوســـــــــــري",
        img: "img/Yasser_Dosarry.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://server11.mp3quran.net/yasser/",
        url: ""
    },
    {
        name: "القارئ نــوريـــن محمد صــديق",
        img: "img/noram_sedek.png",
        desc: "القارئ المتميز برواية الدوري عن أبي عمرو",
        identifier: "https://server16.mp3quran.net/nourin_siddig/Rewayat-Aldori-A-n-Abi-Amr/",
        url: ""
    },
    {
        name: "القارئ مــــحــــمــــد رفــــعــــــــت",
        img: "img/mohamed_ref3t.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://server14.mp3quran.net/refat/",
        url: ""
    },
    {
        name: "القارئ مــــحــــمــــد اللــــحـــيدان",
        img: "img/mo7amed_ella7dan.png",
        desc: "القارئ المعروف بأدائه المتميز للقرآن الكريم",
        identifier: "https://download.tvquran.com/download/TvQuran.com__Al-Lohaidan/",
        url: ""
    },
    {
        name: "القارئ مــــحـــــــمـــــــد أيـــــــــوب",
        img: "img/mo7amed_ayob.png",
        desc: "القارئ المتميز بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://server8.mp3quran.net/ayyub/",
        url: ""
    },
    {
        name: "القارئ مـــنــــصـــور الـــســالمي",
        img: "img/mansor_alsalmy.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://server14.mp3quran.net/mansor/",
        url: ""
    },
    {
        name: "القارئ حــــــســــــــن صــــــالـــــــح",
        img: "img/7assan_sala7.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server16.mp3quran.net/h_saleh/Rewayat-Hafs-A-n-Assem/",
        url: ""
    },
    {
        name: "القارئ خـــــــــــــــالد الجــــلــــيــــل",
        img: "img/5'alid_elgalil.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://server10.mp3quran.net/jleel/",
        url: ""
    },
    {
        name: "القارئ هــــــــــزاع البلـــــوشــــــي",
        img: "img/haza3_elb4lo4i.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://server11.mp3quran.net/hazza/",
        url: ""
    },
    {
        name: "القارئ محمود علي البـنــــــــــــــا",
        img: "img/ma7moud_3li.png",
        desc: "القارئ المتميز بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://server8.mp3quran.net/bna/",
        url: ""
    },
    {
        name: "القارئ هـــيـــثـــم الــــــدخـــيــــــن",
        img: "img/hasam_eld5'en.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://server16.mp3quran.net/h_dukhain/Rewayat-Hafs-A-n-Assem/",
        url: ""
    },
    {
        name: "القارئ محـــمد الطبــــــــــــــلاوي",
        img: "img/eltablawy.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server12.mp3quran.net/tblawi/",
        url: ""
    },
    {
        name: "القارئ عـــــلــي جـــــــــــــابــــــــــــر",
        img: "img/3li_gaber.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://server11.mp3quran.net/a_jbr/",
        url: ""
    },
    {
        name: "القارئ ســـــيــــــــد ســـــعـــــيــــــد",
        img: "img/sayed_Sa3id.png",
        desc: "القارئ المعروف بأدائه المتميز للقرآن الكريم",
        identifier: "https://ia601502.us.archive.org/10/items/019_20221105/",
        url: ""
    },
    {
        name: "القارئ نـورالــديــن سلـــيم نـوري",
        img: "img/NourEldin.png",
        desc: "القارئ المتميز بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://ia904707.us.archive.org/13/items/Noureddine-Salim-Nouri/",
        url: ""
    },
    {
        name: "القارئ مــــحــــمــــد الــــغــــزالـــي",
        img: "img/El3'azali.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://ia601406.us.archive.org/16/items/Mohammed-Al-Ghazali/",
        url: ""
    },
    {
        name: "القارئ يـــــوسف الــــعـــيــــدروس",
        img: "img/youssef-el3iydros.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://ia904706.us.archive.org/14/items/002_20221104_20221104_1814/",
        url: ""
    },
    {
        name: "القارئ إدريــــــــس ابــــــــكــــر",
        img: "img/Edres Abou Baker.png",
        desc: "القارئ المتميز بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://server6.mp3quran.net/abkr/",
        url: ""
    },
    {
        name: "القارئ يـــونـــس اســــويــــلــــص",
        img: "img/Younes Aswells.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://ia801506.us.archive.org/6/items/002_20221104_20221104_1827/",
        url: ""
    },
    {
        name: "القارئ مــــحــــمــــد الــــبــــيـــــخـــت",
        img: "img/Mo7amed_El_Bi5'et.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server14.mp3quran.net/bukheet/Rewayat-Hafs-A-n-Assem/",
        url: ""
    },
    {
        name: "القارئ عــكــاشــة كــمــيــنــي",
        img: "img/3kasha kamini.png",
        desc: "القارئ المعروف بصوته العذب وتلاوته المتقنة",
        identifier: "https://ia800700.us.archive.org/16/items/okasha-kamini-al-bazzi/",
        url: ""
    },
    {
        name: "القارئ أحــــمــد نــعــيــنــع",
        img: "img/A7med Ni3an3.png",
        desc: "القارئ المعروف بأدائه المتميز للقرآن الكريم",
        identifier: "https://server11.mp3quran.net/ahmad_nu/",
        url: ""
    },
    {
        name: "القارئ بــــنــدر بــلــيــلــة",
        img: "img/Bander Bilila.png",
        desc: "القارئ المتميز بصوته الشجي وتلاوته المؤثرة",
        identifier: "https://server6.mp3quran.net/balilah/",
        url: ""
    },
    {
        name: "القارئ جــــزاع الــــصــــويــــلــح",
        img: "img/Gaza3 El-Sole7.png",
        desc: "القارئ المعروف بأدائه المميز للقرآن الكريم",
        identifier: "https://ia802901.us.archive.org/28/items/002yyy20y0425yyyyyyyyyyyyyyyyyyyyyyyyy/",
        url: ""
    },
    {
        name: "القارئ ســـعــــود الـــشــــريـــم",
        img: "img/Su3d Al-4oriam.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server7.mp3quran.net/shur/",
        url: ""
    },
    {
        name: "القارئ رعد مــــحـــمـــد الــــكـــــردي",
        img: "img/ra3d el-kordi.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server6.mp3quran.net/kurdi/",
        url: ""
    },
    {
        name: "القارئ هــــانـــي الـــرفـــاعـــي",
        img: "img/Hany El-rifa3i.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server8.mp3quran.net/hani/",
        url: ""
    },
    {
        name: "القارئ مـــحــــمــد الـــبـــراك",
        img: "img/mo7amed El-Brak.png",
        desc: "القارئ المتميز برواية حفص عن عاصم",
        identifier: "https://server13.mp3quran.net/braak/",
        url: ""
    }
];

// أسماء السور القرآنية
const surahNames = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف",
    "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر",
    "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون",
    "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان",
    "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح",
    "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة",
    "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون",
    "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح",
    "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات",
    "عبس", "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى",
    "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق",
    "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر",
    "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد",
    "الإخلاص", "الفلق", "الناس"
];

// العناصر الرئيسية في الصفحة
const container = document.getElementById('reciterGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const surahSearchInput = document.getElementById('surahSearchInput');
const surahSearchButton = document.getElementById('surahSearchButton');
const recitersSection = document.getElementById('recitersSection');
const surahSection = document.getElementById('surahSection');
const surahList = document.getElementById('surahList');
const surahReciterName = document.getElementById('surahReciterName');
const reciterLogoImg = document.getElementById('reciterLogoImg');
const backBtn = document.getElementById('backBtn');
const audioPlayer = document.getElementById('audioPlayer');
const audioElement = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const nowPlayingDisplay = document.getElementById('nowPlaying');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const downloadBtn = document.getElementById('downloadBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const loadingOverlay = document.getElementById('loadingOverlay');

// متغيرات حالة المشغل
let currentReciter = null;
let currentSurahIndex = -1;
let isPlaying = false;
let isMuted = false;
let lastVolume = 1;
let surahCards = [];
let filteredSurahIndices = [];

// دوال التحميل
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 500);
}

// عرض جميع القراء
function displayReciters() {
    showLoading();

    const fragment = document.createDocumentFragment();

    reciters.forEach(reciter => {
        const card = document.createElement('div');
        card.className = 'reciter-card';
        card.dataset.name = reciter.name.toLowerCase().replace(/\s/g, '');

        card.innerHTML = `
            <div class="reciter-image-container"> 
                <img src="${reciter.img}" alt="${reciter.name}" class="reciter-image" loading="lazy"> 
                <button class="copy-identifier-btn" title="نسخ رابط القارئ">
                    <i class="fas fa-copy"></i>
                </button>
            </div> 
            <div class="reciter-info"> 
                <h3>${reciter.name}</h3> 
                <p>${reciter.desc}</p> 
                <div class="reciter-actions"> 
                    <a href="#" class="btn btn-primary listen-btn"><i class="fas fa-headphones"></i> استماع</a> 
                    ${reciter.url ? `<a href="${reciter.url}" target="_blank" class="btn btn-outline"><i class="fas fa-download"></i> تحميل</a>` : ''}
                </div> 
            </div>`;

        const listenBtn = card.querySelector('.listen-btn');
        listenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSurahs(reciter);
        });

        const copyBtn = card.querySelector('.copy-identifier-btn');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(reciter.identifier);
            showNotification(`تم نسخ رابط القارئ ${reciter.name}`);
        });

        fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    lazyLoadImages();
    hideLoading();
}

// تحميل الصور بكسل
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
}

// عرض سور القارئ المحدد
function showSurahs(reciter) {
    showLoading();
    currentReciter = reciter;
    currentSurahIndex = -1;
    filteredSurahIndices = [];
    surahReciterName.textContent = reciter.name;
    reciterLogoImg.src = reciter.img || 'https://i1.sndcdn.com/artworks-000157161960-6e0z44-t500x500.jpg';
    reciterLogoImg.style.opacity = '0';
    reciterLogoImg.onload = () => {
        reciterLogoImg.style.opacity = '1';
    };

    generateSurahList();

    recitersSection.style.display = 'none';
    surahSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    hideLoading();
}

// توليد قائمة السور
function generateSurahList(filter = '') {
    surahList.innerHTML = '';
    surahCards = [];
    filteredSurahIndices = [];
    const searchTerm = normalizeSearchText(filter.toLowerCase().replace(/\s/g, ''));

    surahNames.forEach((surah, index) => {
        const surahNumber = (index + 1).toString().padStart(3, '0');
        const audioUrl = `${currentReciter.identifier}${surahNumber}.mp3`;
        const surahCard = document.createElement('div');
        surahCard.className = 'surah-card';
        surahCard.dataset.index = index;

        // إضافة صنف للبحث إذا كان هناك تطابق
        const isMatch = searchTerm &&
            normalizeSearchText(surah.toLowerCase().replace(/\s/g, ''))
                .includes(searchTerm);

        surahCard.innerHTML = `
            <button class="copy-surah-btn" title="نسخ رابط السورة">
                <i class="fas fa-copy"></i>
            </button>
            <div class="surah-number">${index + 1}</div>
            <div class="surah-name">سورة ${surah}</div>
            <div class="surah-play-icon"><i class="fas fa-play"></i></div>
        `;

        if (isMatch) {
            surahCard.classList.add('search-match');
            // إضافة مؤقت لإزالة الصنف بعد الأنيميشن
            setTimeout(() => {
                surahCard.classList.remove('search-match');
            }, 2000);
        }

        surahCard.addEventListener('click', () => playSurah(index));

        const copyBtn = surahCard.querySelector('.copy-surah-btn');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(audioUrl);
            showNotification(`تم نسخ رابط سورة ${surah}`);
        });

        surahList.appendChild(surahCard);
        surahCards.push(surahCard);
    });
}

// تشغيل سورة محددة
function playSurah(index) {
    if (index < 0 || index >= surahNames.length) {
        console.error('Invalid surah index:', index);
        return;
    }

    if (currentSurahIndex === index) {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            updateSurahCardIcon(index, 'play');
        } else {
            audioElement.play()
                .then(() => {
                    isPlaying = true;
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    updateSurahCardIcon(index, 'pause');
                })
                .catch(error => {
                    console.error('Error resuming playback:', error);
                    showNotification('حدث خطأ في استئناف التشغيل');
                });
        }
        return;
    }

    if (currentSurahIndex >= 0 && surahCards[currentSurahIndex]) {
        updateSurahCardIcon(currentSurahIndex, 'play');
    }

    showLoading();
    currentSurahIndex = index;
    updateSurahCardIcon(index, 'pause');

    const surahNumber = (index + 1).toString().padStart(3, '0');
    const audioUrl = `${currentReciter.identifier}${surahNumber}.mp3`;

    nowPlayingDisplay.innerHTML = `<i class="fas fa-spinner fa-spin"></i> جارٍ تحميل سورة ${surahNames[index]}...`;
    audioPlayer.style.display = 'block';
    audioPlayer.classList.add('show');

    downloadBtn.onclick = (e) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `تلاوة ${surahNames[index]} - ${currentReciter.name}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    audioElement.src = '';
    audioElement.load();
    audioElement.src = audioUrl;
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audioElement.load();

    audioElement.addEventListener('canplaythrough', () => {
        nowPlayingDisplay.innerHTML = `<i class="fas fa-music"></i> سورة ${surahNames[index]} - ${currentReciter.name}`;
        durationDisplay.textContent = formatTime(audioElement.duration);
        audioElement.play()
            .then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                hideLoading();
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                nowPlayingDisplay.innerHTML = '<i class="fas fa-exclamation-triangle"></i> حدث خطأ في تشغيل السورة';
                showNotification('تعذر تشغيل السورة، الرجاء المحاولة لاحقاً');
                hideLoading();
            });
    }, { once: true });

    audioElement.addEventListener('error', () => {
        nowPlayingDisplay.innerHTML = '<i class="fas fa-exclamation-triangle"></i> حدث خطأ في تحميل السورة';
        showNotification('تعذر تحميل السورة، الرجاء المحاولة لاحقاً');
        hideLoading();
    }, { once: true });
}

// تحديث أيقونة بطاقة السورة
function updateSurahCardIcon(index, action) {
    if (index >= 0 && surahCards[index]) {
        const card = surahCards[index];
        const icon = card.querySelector('.surah-play-icon i');

        if (action === 'play') {
            card.classList.remove('playing');
            icon.className = 'fas fa-play';
        } else {
            card.classList.add('playing');
            icon.className = 'fas fa-pause';
        }
    }
}

// معالجة نص البحث (تجاهل كلمة سورة والمسافات)
function normalizeSearchText(text) {
    text = text.replace(/^سوره|^سورة/i, ''); // تجاهل كلمة سورة في البداية
    text = text.replace(/\s/g, ''); // تجاهل جميع المسافات
    text = text.replace(/[يى]/g, '[يى]');
    text = text.replace(/[هة]/g, '[هة]');
    return text;
}

// تنسيق الوقت
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// تحديث شريط التقدم
function updateProgress() {
    const { currentTime, duration } = audioElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressSlider.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(currentTime);
}

// تعيين موضع التشغيل
function setProgress(e) {
    progressSlider.addEventListener('input', function() {
        const percent = this.value;
        progressBar.style.width = `${percent}%`;
        audioElement.currentTime = (percent / 100) * audioElement.duration;
    });    
}

// نسخ النص
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

// عرض إشعار
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// البحث عن قارئ
function searchReciter() {
    const searchTerm = normalizeSearchText(searchInput.value.trim().toLowerCase());
    const cards = document.querySelectorAll('.reciter-card');
    let found = false;

    cards.forEach(card => {
        const reciterName = card.dataset.name.replace(/ـ/g, '');
        const searchRegex = new RegExp(searchTerm, 'i');

        if (searchTerm === '' || searchRegex.test(reciterName)) {
            if (searchTerm !== '') {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('highlight-search');
                setTimeout(() => card.classList.remove('highlight-search'), 2000);
                found = true;
            }
        }
    });

    if (searchTerm && !found) {
        showNotification('لم يتم العثور على قارئ بهذا الاسم');
    }
}

// البحث عن سورة
function searchSurah() {
    const searchTerm = surahSearchInput.value.trim();
    if (!searchTerm) return;
    
    const cards = document.querySelectorAll('.surah-card');
    let found = false;
    const normalizedSearch = normalizeSearchText(searchTerm.toLowerCase().replace(/\s/g, ''));
    
    // المرحلة الأولى: البحث عن تطابق كامل (بعد إزالة كلمة سورة)
    cards.forEach(card => {
        const surahName = card.querySelector('.surah-name').textContent;
        const normalizedSurah = normalizeSearchText(surahName.toLowerCase().replace(/^سورة\s*/g, ''));
        
        if (normalizedSurah === normalizedSearch) {
            card.classList.add('search-match');
            if (!found) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
            setTimeout(() => card.classList.remove('search-match'), 2000);
        }
    });
    
    // المرحلة الثانية: إذا لم يوجد تطابق كامل، نبحث عن أي سورة تحتوي الحروف
    if (!found) {
        cards.forEach(card => {
            const surahName = card.querySelector('.surah-name').textContent;
            const normalizedSurah = normalizeSearchText(surahName.toLowerCase().replace(/^سورة\s*/g, ''));
            
            if (normalizedSurah.includes(normalizedSearch)) {
                card.classList.add('search-match');
                if (!found) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
                setTimeout(() => card.classList.remove('search-match'), 2000);
            }
        });
    }
    
    // إظهار الإشعارات والاهتزاز
    if (found) {
        surahSearchInput.classList.add('search-success');
        setTimeout(() => surahSearchInput.classList.remove('search-success'), 500);
    } else {
        showNotification('لم يتم العثور على سورة بهذا الاسم');
    }
}

// أحداث المشغل الصوتي
playBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        if (currentSurahIndex === -1) {
            const firstIndex = filteredSurahIndices.length > 0 ? filteredSurahIndices[0] : 0;
            if (firstIndex >= 0) {
                playSurah(firstIndex);
            }
        } else {
            audioElement.play()
                .then(() => {
                    isPlaying = true;
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if (currentSurahIndex >= 0) {
                        updateSurahCardIcon(currentSurahIndex, 'pause');
                    }
                })
                .catch(error => {
                    console.error('Error resuming playback:', error);
                    showNotification('حدث خطأ في استئناف التشغيل');
                });
        }
    } else {
        audioElement.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (currentSurahIndex >= 0) {
            updateSurahCardIcon(currentSurahIndex, 'play');
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSurahIndex <= 0) {
        showNotification('هذه أول سورة في القائمة');
        return;
    }

    if (filteredSurahIndices.length > 0) {
        const currentIndexInFiltered = filteredSurahIndices.indexOf(currentSurahIndex);
        if (currentIndexInFiltered > 0) {
            playSurah(filteredSurahIndices[currentIndexInFiltered - 1]);
        } else {
            showNotification('هذه أول سورة في نتائج البحث');
        }
    } else {
        playSurah(currentSurahIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSurahIndex >= surahNames.length - 1) {
        showNotification('هذه آخر سورة في القائمة');
        return;
    }

    if (filteredSurahIndices.length > 0) {
        const currentIndexInFiltered = filteredSurahIndices.indexOf(currentSurahIndex);
        if (currentIndexInFiltered < filteredSurahIndices.length - 1) {
            playSurah(filteredSurahIndices[currentIndexInFiltered + 1]);
        } else {
            showNotification('هذه آخر سورة في نتائج البحث');
        }
    } else {
        playSurah(currentSurahIndex + 1);
    }
});

volumeBtn.addEventListener('click', () => {
    if (isMuted) {
        audioElement.volume = lastVolume;
        volumeSlider.value = lastVolume;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false;
    } else {
        lastVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = true;
    }
});

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    if (audioElement.volume > 0) {
        isMuted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        isMuted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// أحداث الصوت
audioElement.addEventListener('timeupdate', updateProgress);
audioElement.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    if (currentSurahIndex >= 0) {
        updateSurahCardIcon(currentSurahIndex, 'play');
    }

    if (filteredSurahIndices.length > 0) {
        const currentIndexInFiltered = filteredSurahIndices.indexOf(currentSurahIndex);
        if (currentIndexInFiltered < filteredSurahIndices.length - 1) {
            setTimeout(() => {
                playSurah(filteredSurahIndices[currentIndexInFiltered + 1]);
            }, 2000);
        }
    } else if (currentSurahIndex < surahNames.length - 1) {
        setTimeout(() => {
            playSurah(currentSurahIndex + 1);
        }, 2000);
    }
});

progressContainer.addEventListener('click', setProgress);

// زر العودة للقراء
backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recitersSection.style.display = 'block';
    surahSection.style.display = 'none';
    audioPlayer.classList.remove('show');
    setTimeout(() => {
        audioPlayer.style.display = 'none';
    }, 300);
    audioElement.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    if (currentSurahIndex >= 0) {
        updateSurahCardIcon(currentSurahIndex, 'play');
    }
});

// أحداث البحث
searchButton.addEventListener('click', searchReciter);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchReciter();
    }
});

surahSearchButton.addEventListener('click', searchSurah);
surahSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSurah();
    }
});

// تحميل الصفحة
window.addEventListener('load', () => {
    displayReciters();

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});