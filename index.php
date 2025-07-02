<?php
// Konfiguracja strony
$site_title = "Emanuel Włoch - Programista Full-Stack";
$current_year = date('Y');
$contact_email = "emanuel.wloch@icloud.com";
$contact_phone = "+48 725 403 682";

// Obsługa formularza kontaktowego
$message_sent = false;
$error_message = "";

if ($_POST && isset($_POST['contact_form'])) {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    
    // Walidacja
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $error_message = "Wszystkie pola są wymagane.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Nieprawidłowy adres email.";
    } else {
        // Wysyłanie emaila (w rzeczywistej aplikacji)
        $to = $contact_email;
        $email_subject = "Kontakt ze strony: " . $subject;
        $email_body = "Imię: $name\nEmail: $email\nTemat: $subject\n\nWiadomość:\n$message";
        $headers = "From: $email\r\nReply-To: $email\r\n";
        
        // W środowisku produkcyjnym odkomentuj poniższą linię
        // mail($to, $email_subject, $email_body, $headers);
        
        $message_sent = true;
    }
}

// Funkcja do generowania meta tagów
function generateMetaTags($title, $description) {
    return [
        'title' => $title,
        'description' => $description,
        'og_title' => $title,
        'og_description' => $description
    ];
}

$meta = generateMetaTags($site_title, "Profesjonalne usługi programistyczne - tworzenie stron internetowych, aplikacji webowych i mobilnych. Specjalizacja w React, Node.js, Python i .NET.");
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($meta['title']); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($meta['description']); ?>">
    <meta name="keywords" content="strony internetowe, aplikacje desktopowe, web developer, HTML, CSS, JavaScript, React, Vue.js, Node.js, Python, PHP, responsywny design, SEO, Emanuel Włoch">
    <meta name="author" content="Emanuel Włoch">
    <meta name="robots" content="index, follow">
    <meta name="language" content="pl">
    <meta name="geo.region" content="PL">
    <meta name="geo.placename" content="Polska">
    <meta name="geo.position" content="52.2297;21.0122">
    <meta name="ICBM" content="52.2297, 21.0122">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="theme-color" content="#6366f1">
    <meta name="msapplication-TileColor" content="#6366f1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=yes">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://emanuelw.pl/">
    <meta property="og:title" content="<?php echo htmlspecialchars($meta['og_title']); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($meta['og_description']); ?>">
    <meta property="og:image" content="https://emanuelw.pl/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="pl_PL">
    <meta property="og:site_name" content="Emanuel Włoch - Programista">
    <meta property="article:author" content="Emanuel Włoch">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://emanuelw.pl/">
    <meta property="twitter:title" content="Emanuel Włoch - Web Developer & Desktop Apps">
    <meta property="twitter:description" content="Profesjonalne strony internetowe i aplikacje desktopowe. Nowoczesne rozwiązania webowe z czystym kodem.">
    <meta property="twitter:image" content="https://emanuelw.pl/twitter-image.jpg">
    <meta name="twitter:creator" content="@emanuelwloch">
    <meta name="twitter:site" content="@emanuelwloch">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://emanuelw.pl/">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Additional Performance Optimizations -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    
    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Additional SEO and Performance -->
    <meta name="google-site-verification" content="your-google-verification-code">
    <meta name="msvalidate.01" content="your-bing-verification-code">
    <meta name="p:domain_verify" content="your-pinterest-verification-code">
    
    <!-- SEO Files -->
    <link rel="sitemap" type="application/xml" href="/sitemap.xml">
    <link rel="robots" href="/robots.txt">
    
    <!-- Additional Performance and SEO -->
    <meta name="referrer" content="origin-when-cross-origin">
    <meta name="color-scheme" content="dark light">
    <meta name="supported-color-schemes" content="dark light">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="styles.css" as="style">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style">
    
    <!-- Structured Data for Breadcrumbs -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Strona główna",
                "item": "https://emanuelw.pl"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "O mnie",
                "item": "https://emanuelw.pl#about"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Usługi",
                "item": "https://emanuelw.pl#services"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Projekty",
                "item": "https://emanuelw.pl#projects"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "Kontakt",
                "item": "https://emanuelw.pl#contact"
            }
        ]
    }
    </script>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Emanuel Włoch",
        "jobTitle": "Programista Full-Stack",
        "description": "Profesjonalny programista specjalizujący się w tworzeniu stron internetowych, aplikacji webowych i mobilnych",
        "url": "https://emanuelw.pl",
        "email": "emanuel.wloch@icloud.com",
        "telephone": "+48 725 403 682",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PL",
            "addressRegion": "Mazowieckie"
        },
        "knowsAbout": [
            "JavaScript", "TypeScript", "React", "Angular", "Node.js", "Python", "C#", 
            "HTML5", "CSS3", "Sass", "Bootstrap", "Tailwind CSS", ".NET Core", "Express.js", 
            "Django", "Laravel", "WPF", "Qt", "Tkinter", "MySQL", "PostgreSQL", "MongoDB", 
            "SQLite", "Redis", "Firebase", "AWS", "Azure", "Git", "CI/CD", "Webpack", "Vite", 
            "Google Analytics", "Search Console", "PageSpeed", "Core Web Vitals"
        ],
        "sameAs": [
            "https://github.com/emanuelwloch",
            "https://linkedin.com/in/emanuelwloch"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Freelancer"
        },
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Uniwersytet Techniczny"
        }
    }
    </script>
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Emanuel Włoch - Programista Full-Stack",
        "url": "https://emanuelw.pl",
        "description": "Profesjonalne usługi programistyczne - tworzenie stron internetowych, aplikacji webowych i mobilnych",
        "author": {
            "@type": "Person",
            "name": "Emanuel Włoch"
        },
        "inLanguage": "pl-PL",
        "copyrightYear": "2025",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://emanuelw.pl/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Emanuel Włoch - Usługi Programistyczne",
        "description": "Profesjonalne tworzenie stron internetowych, aplikacji webowych i mobilnych",
        "url": "https://emanuelw.pl",
        "telephone": "+48 725 403 682",
        "email": "emanuel.wloch@icloud.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PL"
        },
        "serviceType": [
            "Tworzenie stron internetowych",
            "Aplikacje webowe",
            "Aplikacje mobilne",
            "Konsultacje IT",
            "Optymalizacja SEO"
        ],
        "areaServed": "PL",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Usługi programistyczne",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Strona wizytówka",
                        "description": "Profesjonalna strona wizytówka z responsywnym designem"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Sklep internetowy",
                        "description": "Kompleksowy sklep internetowy z systemem płatności"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Aplikacja webowa",
                        "description": "Zaawansowana aplikacja webowa dostosowana do potrzeb"
                    }
                }
            ]
        }
    }
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2>Emanuel Włoch</h2>
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">O mnie</a></li>
                <li><a href="#services" class="nav-link">Usługi</a></li>
                <li><a href="#projects" class="nav-link">Projekty</a></li>
                <li><a href="#pricing" class="nav-link">Cennik</a></li>
                <li><a href="#contact" class="nav-link">Kontakt</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <main>
        <section id="home" class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <h1 class="hero-title">
                        <span class="gradient-text">Emanuel Włoch</span>
                        <br>Web Developer & Desktop Apps
                    </h1>
                    <p class="hero-description">
                        Tworzę nowoczesne strony internetowe i aplikacje desktopowe, 
                        które łączą funkcjonalność z eleganckim designem.
                    </p>
                    <div class="hero-buttons">
                        <a href="#projects" class="btn btn-primary">Zobacz projekty</a>
                        <a href="#contact" class="btn btn-secondary">Skontaktuj się</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="code-window">
                        <div class="window-header">
                            <div class="window-controls">
                                <span class="control red"></span>
                                <span class="control yellow"></span>
                                <span class="control green"></span>
                            </div>
                        </div>
                        <div class="code-content">
                            <pre><code><span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">'Emanuel Włoch'</span>,
  <span class="property">skills</span>: [
    <span class="string">'HTML5'</span>, <span class="string">'CSS3'</span>, <span class="string">'JavaScript'</span>, <span class="string">'TypeScript'</span>,
    <span class="string">'React'</span>, <span class="string">'Vue.js'</span>, <span class="string">'Angular'</span>, <span class="string">'Node.js'</span>,
    <span class="string">'Python'</span>, <span class="string">'PHP'</span>, <span class="string">'C#'</span>, <span class="string">'C++'</span>,
    <span class="string">'MySQL'</span>, <span class="string">'MongoDB'</span>, <span class="string">'AWS'</span>, <span class="string">'Docker'</span>
  ],
  <span class="property">passion</span>: <span class="string">'Clean Code & Innovation'</span>,
  <span class="property">experience</span>: <span class="string">'5+ years'</span>
};</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2 class="section-title">O mnie</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>
                            Jestem pasjonatem technologii z wieloletnim doświadczeniem w tworzeniu 
                            stron internetowych i aplikacji desktopowych. Specjalizuję się w 
                            nowoczesnych technologiach webowych oraz czystym, wydajnym kodzie.
                        </p>
                        <p>
                            Moje podejście opiera się na zasadach "Never Repeat Yourself" i "Clean Code", 
                            co gwarantuje wysoką jakość i łatwość utrzymania projektów.
                        </p>
                    </div>
                    <div class="skills-grid">
                        <div class="skill-item">
                            <h3>Frontend</h3>
                            <p>HTML5, CSS3, JavaScript, TypeScript, React, Vue.js, Angular, Sass, Bootstrap</p>
                        </div>
                        <div class="skill-item">
                            <h3>Backend</h3>
                            <p>Node.js, Python, PHP, .NET Core, Express.js, Django, Laravel</p>
                        </div>
                        <div class="skill-item">
                            <h3>Desktop Apps</h3>
                            <p>Electron, .NET, Python, C++, WPF, Qt, Tkinter</p>
                        </div>
                        <div class="skill-item">
                            <h3>Bazy danych</h3>
                            <p>MySQL, PostgreSQL, MongoDB, SQLite, Redis, Firebase</p>
                        </div>
                        <div class="skill-item">
                            <h3>DevOps & Tools</h3>
                            <p>Git, Docker, AWS, Azure, CI/CD, Webpack, Vite</p>
                        </div>
                        <div class="skill-item">
                            <h3>SEO & Performance</h3>
                            <p>Google Analytics, Search Console, PageSpeed, Core Web Vitals</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="services" class="services">
            <div class="container">
                <h2 class="section-title">Usługi</h2>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h3>Strony internetowe</h3>
                        <p>Responsywne strony internetowe z nowoczesnym designem, zoptymalizowane pod SEO i wydajność.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                        </div>
                        <h3>Aplikacje desktopowe</h3>
                        <p>Wydajne aplikacje desktopowe dostosowane do specyficznych potrzeb biznesowych.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                        </div>
                        <h3>Optymalizacja</h3>
                        <p>Audyt i optymalizacja istniejących projektów pod kątem wydajności i SEO.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" class="projects">
            <div class="container">
                <h2 class="section-title">Projekty</h2>
                <div class="projects-grid">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23111111'/%3E%3Cstop offset='100%25' style='stop-color:%231a1a1a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg)'/%3E%3Cg transform='translate(50,50)'%3E%3Crect x='0' y='0' width='700' height='300' fill='%23000' rx='8'/%3E%3Crect x='20' y='20' width='120' height='40' fill='%23fbbf24' rx='4'/%3E%3Ctext x='80' y='45' text-anchor='middle' fill='%23000' font-family='Arial' font-size='16' font-weight='bold'%3EBCC%3C/text%3E%3Ctext x='50' y='100' fill='%23fbbf24' font-family='Arial' font-size='32' font-weight='bold'%3EBudujemy%3C/text%3E%3Ctext x='50' y='140' fill='%23fbbf24' font-family='Arial' font-size='32' font-weight='bold'%3ETwoje marzenia%3C/text%3E%3Ctext x='50' y='180' fill='%23a1a1aa' font-family='Arial' font-size='14'%3EProfesjonalne usługi budowlane z najwyższą%3C/text%3E%3Ctext x='50' y='200' fill='%23a1a1aa' font-family='Arial' font-size='14'%3Ejakością wykonania i dbałością o każdy detal.%3C/text%3E%3Ctext x='50' y='220' fill='%23a1a1aa' font-family='Arial' font-size='14'%3EZaufaj ekspertom z wieloletnim doświadczeniem.%3C/text%3E%3Crect x='50' y='240' width='120' height='35' fill='%23fbbf24' rx='4'/%3E%3Ctext x='110' y='262' text-anchor='middle' fill='%23000' font-family='Arial' font-size='14' font-weight='bold'%3EOtrzymaj wycenę%3C/text%3E%3Cg transform='translate(450,80)'%3E%3Crect x='0' y='0' width='200' height='150' fill='%23333' rx='8'/%3E%3Cpolygon points='20,130 60,90 100,110 140,70 180,90 180,130' fill='%23555'/%3E%3Crect x='160' y='20' width='15' height='15' fill='%23fbbf24'/%3E%3Crect x='160' y='40' width='15' height='15' fill='%23fbbf24'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" alt="BCC - Strona firmy budowlanej">
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">BCC - Firma Budowlana</h3>
                            <p class="project-description">
                                Nowoczesna strona internetowa dla firmy budowlanej BCC. Projekt zawiera sekcję hero z motywującym hasłem "Budujemy Twoje marzenia", prezentację usług oraz statystyki firmy. Strona została zaprojektowana z myślą o profesjonalnym wizerunku i łatwości nawigacji.
                            </p>
                            <div class="project-tech">
                                <span class="tech-tag">HTML5</span>
                                <span class="tech-tag">CSS3</span>
                                <span class="tech-tag">JavaScript</span>
                                <span class="tech-tag">Responsive Design</span>
                                <span class="tech-tag">SEO</span>
                            </div>
                            <div class="project-links">
                                <a href="https://xitali.github.io/bodzio" target="_blank" rel="noopener" class="project-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                        <polyline points="15,3 21,3 21,9"/>
                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                    </svg>
                                    Demo na żywo
                                </a>
                                <a href="https://github.com/xitali/bodzio" target="_blank" rel="noopener" class="project-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                    Kod źródłowy
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-placeholder">
                        <div class="placeholder-content">
                            <h3>Następny projekt</h3>
                            <p>Miejsce na kolejne realizacje</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <div class="container">
                <h2 class="section-title">Cennik</h2>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <h3>Strona wizytówka</h3>
                        <div class="price">
                            <span class="amount">od 1500</span>
                            <span class="currency">PLN</span>
                        </div>
                        <ul class="features">
                            <li>Responsywny design</li>
                            <li>Do 5 podstron</li>
                            <li>Podstawowe SEO</li>
                            <li>Formularz kontaktowy</li>
                            <li>1 miesiąc wsparcia</li>
                        </ul>
                    </div>
                    <div class="pricing-card featured">
                        <div class="popular-badge">Popularne</div>
                        <h3>Strona firmowa</h3>
                        <div class="price">
                            <span class="amount">od 3500</span>
                            <span class="currency">PLN</span>
                        </div>
                        <ul class="features">
                            <li>Zaawansowany design</li>
                            <li>Do 15 podstron</li>
                            <li>Zaawansowane SEO</li>
                            <li>Panel administracyjny</li>
                            <li>Integracje zewnętrzne</li>
                            <li>3 miesiące wsparcia</li>
                        </ul>
                    </div>
                    <div class="pricing-card">
                        <h3>Aplikacja desktopowa</h3>
                        <div class="price">
                            <span class="amount">od 5000</span>
                            <span class="currency">PLN</span>
                        </div>
                        <ul class="features">
                            <li>Dedykowana aplikacja</li>
                            <li>Cross-platform</li>
                            <li>Baza danych</li>
                            <li>Dokumentacja</li>
                            <li>6 miesięcy wsparcia</li>
                        </ul>
                    </div>
                </div>
                <div class="pricing-note">
                    <p>Ceny są orientacyjne i zależą od złożoności projektu. Skontaktuj się, aby otrzymać spersonalizowaną wycenę.</p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title">Kontakt</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <h3>Skontaktuj się ze mną</h3>
                        <p>Masz projekt do realizacji? Chętnie omówię szczegóły i przedstawię ofertę.</p>
                        
                        <?php if ($message_sent): ?>
                    <div class="success-message">
                        <p>✅ Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.</p>
                    </div>
                <?php endif; ?>
                
                <?php if ($error_message): ?>
                    <div class="error-message">
                        <p>❌ <?php echo htmlspecialchars($error_message); ?></p>
                    </div>
                <?php endif; ?>
                
                <form method="POST" class="contact-form">
                    <input type="hidden" name="contact_form" value="1">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Imię i nazwisko</label>
                            <input type="text" id="name" name="name" required value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="subject">Temat</label>
                        <input type="text" id="subject" name="subject" required value="<?php echo htmlspecialchars($_POST['subject'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="message">Wiadomość</label>
                        <textarea id="message" name="message" rows="5" required><?php echo htmlspecialchars($_POST['message'] ?? ''); ?></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Wyślij wiadomość</button>
                </form>
                
                <div class="contact-methods">
                    <div class="contact-method">
                        <div class="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h4>Email</h4>
                            <a href="mailto:<?php echo $contact_email; ?>"><?php echo $contact_email; ?></a>
                        </div>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h4>Telefon</h4>
                            <a href="tel:<?php echo str_replace(' ', '', $contact_phone); ?>"><?php echo $contact_phone; ?></a>
                        </div>
                    </div>
                </div>
                        
                        <div class="response-time">
                            <p><strong>Czas odpowiedzi:</strong> Do 24 godzin</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-left">
                    <h3>Emanuel Włoch</h3>
                    <p>Web Developer & Desktop Apps</p>
                </div>
                <div class="footer-right">
                    <p>&copy; <?php echo $current_year; ?> Emanuel Włoch. Wszystkie prawa zastrzeżone.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>