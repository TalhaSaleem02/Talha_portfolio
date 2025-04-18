import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";

export default function contact() {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [messageOk, setMessageOk] = useState('');

    const handleProjectChange = (projectName) => {
        setProject(prev =>
            prev.includes(projectName)
                ? prev.filter(p => p !== projectName)
                : [...prev, projectName]
        );
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setMessageOk('Sending...');

        const data = {
            name,
            lname,
            email,
            company,
            phone,
            country,
            project,
            price,
            description
        };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('✅ Message sent successfully!');

            // Reset form
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject([]);
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error("Error sending message:", error);
            setMessageOk('❌ Failed to send message');
        }
    };

    return (
        <div className="contactpage">
            <Head>
                <title>Talha - Contact</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="/img/logo1.png" href="/img/mee.png" />
            </Head>
            <div className="container" data-aos="fade-up">
                <div className="contactformp">
                    {/* Left Contact Info */}
                    <div className="leftcontp">
                        <h2>Get in touch</h2>
                        <h2>Let's talk about your project</h2>
                        <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                        <p>Use the form on this page or get in touch by other means.</p>
                        <p>I love questions and feedback - Always happy to help!</p>

                        <div className="leftsociinfo">
                            <ul>
                                <li>
                                    <FaPhoneVolume />
                                    <span>
                                        Phone: <a href="tel:+123456789" target="_blank" rel="noopener noreferrer">+1-123456789</a>
                                    </span>
                                </li>
                                <li>
                                    <MdAttachEmail />
                                    <span>
                                        Email: <a href="mailto:sayyed_talha@outlook.com" target="_blank" rel="noopener noreferrer">sayyed_talha@outlook.com</a>
                                    </span>
                                </li>
                                <li>
                                    <GrLinkedin />
                                    <span>
                                        LinkedIn: <a
                                            href="https://www.linkedin.com/in/talha-saleem-ahmad-69b83821/?trk=PROFILE_DROP_DOWN"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Talha Saleem Ahmed
                                        </a>
                                    </span>
                                </li>
                                <li>
                                    <FaTwitter />
                                    <span>
                                        Twitter: <a
                                            href="https://twitter.com/vbmcoder"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            @Talha.Saleem
                                        </a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Contact Form */}
                    <div className="rightcontp">
                        <form onSubmit={handleSubmit}>
                            <div className="rightconttitle">
                                <h2>Your Contact Information</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                    placeholder="First name"
                                    required
                                />
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={(ev) => setLname(ev.target.value)}
                                    placeholder="Last name"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    placeholder="Email address"
                                    required
                                />
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(ev) => setCompany(ev.target.value)}
                                    placeholder="Company name"
                                    required
                                />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(ev) => setPhone(ev.target.value)}
                                    placeholder="Phone number"
                                    required
                                />
                                <select
                                    name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    id="country"
                                >
                                    <option value="">Select Country</option>
                                    <option value="us">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="de">Germany</option>
                                    <option value="fr">France</option>
                                    <option value="ae">United Arab Emirates</option>
                                    <option value="ca">Canada</option>
                                    <option value="au">Australia</option>
                                    <option value="jp">Japan</option>
                                    <option value="br">Brazil</option>
                                </select>
                            </div>

                            <div className="rightconttitle">
                                <h2>What services</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    '1-to-1 Session',
                                    'Group Session',
                                    'Project Consultancy',
                                    'Project Development',
                                    'Consultancy',
                                    'Technical Training' // newly added
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)}
                                        />
                                        {projectOption}
                                    </label>
                                ))}
                            </div>
                            <div className="rightcontredio">
                                {[
                                    'Less than $400',
                                    '$400 - $800',
                                    '$800 - $1000',
                                    'More than $1000'
                                ].map((priceRange, index) => {
                                    const safeId = `price-${index}`;

                                    return (
                                        <label key={safeId} htmlFor={safeId} className="radio-button">
                                            <input
                                                type="radio"
                                                id={safeId}
                                                name="budget"
                                                value={priceRange}
                                                checked={price === priceRange}
                                                onChange={handlePriceChange}
                                            />
                                            <span className="radio"></span>
                                            {priceRange}
                                        </label>
                                    );
                                })}
                            </div>


                            <div className="rightconttitle">
                                <h2>Tell me about your project</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea
                                    value={description}
                                    onChange={(ev) => setDescription(ev.target.value)}
                                    name="description"
                                    rows={4}
                                    placeholder="Project description"
                                ></textarea>
                            </div>
                            <hr />
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Submit</button>
                                <p>{messageOk}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
