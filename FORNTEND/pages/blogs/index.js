import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';

export default function blogs() {


    return <>
        <Head>
            <title>Talha - Blogs</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" type="/img/logo1.png" href="/img/mee.png" />
        </Head>
        <div className="shoppage">
            <div className="shoppagetoptitle">
                <div className="container" data-aos="fade-up">
                    <h2>Blog articles will soon be featured directly on the website</h2>
                    <h3>
                        Meanwhile, check out my posts on&nbsp;
                        <a
                            href="https://medium.com/@talhasaleemahmed"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#00ab6c', // Medium green
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            Medium Blog
                            <span style={{ fontSize: '1.2rem' }}>📝</span>
                        </a>
                    </h3>
                </div>
            </div>
        </div>

    </>
}