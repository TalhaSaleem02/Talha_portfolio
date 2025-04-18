import Head from "next/head";

export default function youtube() {


    return <>

        
            <Head>
                <title>Talha - Youtube</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="/img/logo1.png" href="/img/mee.png" />
            </Head>
        <div className="shoppage" data-aos="fade-up">
            <div className="shoppagetoptitle">
                <div className="container">
                    <h2>YouTube videos will soon be integrated into the website</h2>
                    <h3>
                        Meanwhile, visit the channel here:&nbsp;
                        <a
                            href="https://www.youtube.com/@TalhaSA-y3q"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#FF0000',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            YouTube Channel <span style={{ fontSize: '1.2rem' }}>▶️</span>
                        </a>
                    </h3>
                </div>
            </div>
        </div>

     
    </>
}


