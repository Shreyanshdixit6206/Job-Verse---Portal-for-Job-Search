document.addEventListener('DOMContentLoaded', function() {

    // --- MOCK DATA ---
    const jobsData = [
        { 
            id: 1, title: 'Game UI/UX Designer', company: 'CyberDream Studios', category: 'Design', type: 'Full time', salary: '$50k-$65k', location: 'Neo-Tokyo, JP', posted: '5 min ago', logo: 'https://logo.clearbit.com/riotgames.com',
            description: 'Design immersive and intuitive user interfaces for our next-gen AAA titles. You will collaborate with artists and developers to create unforgettable player experiences.',
            responsibilities: [
                'Create wireframes, storyboards, user flows, and sitemaps.',
                'Design graphic user interface elements, like menus, tabs, and widgets.',
                'Develop UI mockups and prototypes that clearly illustrate how sites function.',
                'Conduct layout adjustments based on user feedback.'
            ],
            skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'Gaming Passion'],
        },
        { 
            id: 2, title: 'Community Growth Hacker', company: 'ConnectSphere', category: 'Marketing', type: 'Remote', salary: '$40k-$55k', location: 'Global', posted: '15 min ago', logo: 'https://logo.clearbit.com/discord.com',
            description: 'We are looking for a creative and data-driven Growth Hacker to lead our community engagement and expansion efforts. Your goal is to grow our user base across all platforms.',
            responsibilities: [
                'Develop and execute community growth strategies.',
                'Manage social media channels and online forums.',
                'Analyze data to identify trends and opportunities.',
                'Run marketing campaigns and promotions.'
            ],
            skills: ['Social Media Marketing', 'Data Analysis', 'Content Creation', 'SEO'],
        },
        { 
            id: 3, title: 'Frontend Animator', company: 'PixelPerfect Inc.', category: 'Tech & IT', type: 'Full time', salary: '$60k-$75k', location: 'San Francisco, USA', posted: '30 min ago', logo: 'https://logo.clearbit.com/dribbble.com',
            description: 'Bring our web applications to life with stunning animations and micro-interactions. You will work with designers to implement fluid and engaging user interfaces.',
            responsibilities: [
                'Develop high-quality, reusable code for UI animations.',
                'Collaborate with designers to translate mockups into reality.',
                'Optimize web applications for maximum speed and scalability.',
                'Ensure a seamless user experience across all devices.'
            ],
            skills: ['JavaScript (ES6+)', 'CSS3', 'GSAP', 'React/Vue', 'WebGL'],
        },
        { 
            id: 4, title: 'Cybersecurity Analyst', company: 'SecureNet', category: 'Tech & IT', type: 'Full time', salary: '$70k-$90k', location: 'Austin, USA', posted: '1 hour ago', logo: 'https://logo.clearbit.com/cloudflare.com',
            description: 'Protect our digital assets from threats. You will monitor our networks, analyze security breaches, and implement robust security measures to ensure data integrity.',
            responsibilities: [
                'Monitor security access and conduct security assessments.',
                'Perform vulnerability testing and risk analysis.',
                'Investigate security breaches and other cybersecurity incidents.',
                'Develop and implement security policies and procedures.'
            ],
            skills: ['Cybersecurity', 'Network Security', 'SIEM', 'Penetration Testing'],
        },
        { 
            id: 5, title: 'AI Ethics Researcher', company: 'FutureMind AI', category: 'Research', type: 'Remote', salary: '$80k-$110k', location: 'Global', posted: '2 hours ago', logo: 'https://logo.clearbit.com/openai.com',
            description: 'Join our team to research and develop ethical guidelines for artificial intelligence. Your work will shape the future of responsible AI development and deployment.',
            responsibilities: [
                'Conduct research on the ethical implications of AI.',
                'Develop frameworks for ethical AI design and use.',
                'Collaborate with policy makers and industry leaders.',
                'Publish research findings in academic journals.'
            ],
            skills: ['AI Ethics', 'Research', 'Philosophy', 'Public Policy', 'Machine Learning'],
        },
        { 
            id: 6, title: 'VR World Builder', company: 'Oasis Realms', category: 'Gaming', type: 'Full time', salary: '$65k-$80k', location: 'Los Angeles, USA', posted: '3 hours ago', logo: 'https://logo.clearbit.com/oculus.com',
            description: 'Create breathtaking virtual worlds for our flagship VR platform. You will use cutting-edge tools to design and build immersive environments that captivate players.',
            responsibilities: [
                'Design and model 3D assets and environments.',
                'Implement interactive elements and gameplay mechanics.',
                'Optimize worlds for performance on VR hardware.',
                'Work with a team of artists and developers.'
            ],
            skills: ['Unity/Unreal Engine', '3D Modeling (Blender/Maya)', 'Level Design', 'VR Development'],
        },
    ];

    // --- CARD GENERATION ---
    function createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'job-card-re glass-card p-6 flex flex-col gap-4 reveal';
        
        const contentHtml = `
            <div class="flex items-center gap-4">
                <img src="${job.logo}" alt="${job.company} logo" class="w-14 h-14 rounded-xl object-contain flex-shrink-0" onerror="this.src='https://placehold.co/60x60/1e293b/94a3b8?text=${job.company.charAt(0)}'">
                <div>
                    <h3 class="font-bold text-xl text-white">${job.title}</h3>
                    <p class="text-slate-400">${job.company}</p>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300 text-sm">
                <span class="bg-slate-700/50 px-3 py-1 rounded-full font-semibold"><i class="fa-solid fa-map-marker-alt mr-2 text-purple-400"></i>${job.location}</span>
                <span class="bg-slate-700/50 px-3 py-1 rounded-full font-semibold"><i class="fa-solid fa-clock mr-2 text-pink-400"></i>${job.type}</span>
            </div>
            <div class="flex justify-between items-center mt-auto pt-4">
                <p class="text-lg font-bold gradient-text">${job.salary}</p>
                <a href="job-details.html?id=${job.id}" class="btn-primary text-sm !py-2 !px-4">Details</a>
            </div>
        `;
        card.innerHTML = contentHtml;
        return card;
    }

    const recentJobsContainer = document.getElementById('recent-jobs-container');
    if (recentJobsContainer) {
        jobsData.slice(0, 3).forEach(job => {
            recentJobsContainer.appendChild(createJobCard(job));
        });
    }

    const allJobsContainer = document.getElementById('all-jobs-container');
    if (allJobsContainer) {
        jobsData.forEach(job => {
            allJobsContainer.appendChild(createJobCard(job));
        });
    }

    // --- JOB DETAILS PAGE LOGIC ---
    if (window.location.pathname.endsWith('job-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = parseInt(urlParams.get('id'));
        const job = jobsData.find(j => j.id === jobId);

        if (job) {
            document.getElementById('job-detail-logo').src = job.logo;
            document.getElementById('job-detail-title').textContent = job.title;
            document.getElementById('job-detail-company').textContent = job.company;
            document.getElementById('job-detail-location').innerHTML = `<i class="fa-solid fa-map-marker-alt mr-2 text-purple-400"></i>${job.location}`;
            document.getElementById('job-detail-type').innerHTML = `<i class="fa-solid fa-clock mr-2 text-pink-400"></i>${job.type}`;
            document.getElementById('job-detail-description').textContent = job.description;

            const respContainer = document.getElementById('job-detail-responsibilities');
            respContainer.innerHTML = '';
            job.responsibilities.forEach(r => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `<i class="fa-solid fa-check-circle text-purple-400 mt-1 mr-3 flex-shrink-0"></i><span>${r}</span>`;
                respContainer.appendChild(li);
            });

            const skillsContainer = document.getElementById('job-detail-skills');
            skillsContainer.innerHTML = '';
            job.skills.forEach(s => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `<i class="fa-solid fa-star text-pink-400 mt-1 mr-3 flex-shrink-0"></i><span>${s}</span>`;
                skillsContainer.appendChild(li);
            });
            
            const overviewContainer = document.getElementById('job-detail-overview');
            overviewContainer.innerHTML = `
                <p><i class="fa-solid fa-calendar-day w-6 gradient-text"></i> <span class="font-semibold text-white">Date Posted:</span> ${job.posted}</p>
                <p><i class="fa-solid fa-dollar-sign w-6 gradient-text"></i> <span class="font-semibold text-white">Offered Salary:</span> ${job.salary}</p>
                <p><i class="fa-solid fa-briefcase w-6 gradient-text"></i> <span class="font-semibold text-white">Category:</span> ${job.category}</p>
            `;
        }
    }

    // --- LOGIN/REGISTER FORM TOGGLE ---
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });
    }
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
    // Handle hash on page load for register form
    if (window.location.hash === '#register' && loginForm) {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }


    // --- MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- SCROLL ANIMATIONS ---
    function observeAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }
    
    observeAnimations();
});
