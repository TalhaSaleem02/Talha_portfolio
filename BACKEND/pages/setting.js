import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";


export default function Setting() {
    // State for editable fields
    const [phone, setPhone] = useState("123456789");
    const [email, setEmail] = useState("youremail@gmail.com");

    // Save function (can be modified to integrate API calls)
    const handleSave = () => {
        alert(`Saved Details:\nPhone: ${phone}\nEmail: ${email}`);
    };

    return (
        <div className="settingpage">
            <div className="titledashboard flex flex-sb">
                {/* Header Section */}
                <div>
                    <h2>Admin <span>Settings</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>

                {/* Breadcrumb Navigation */}
                <nav className="breadcrumb">
                    <IoSettingsOutline /> <span>/</span> <span>Settings</span>
                </nav>
            </div>

            {/* Profile Settings Section */}
            <div className="profilesettings">
                <div className="leftprofile_details flex">
                    <img src="/img/coder.jpeg" alt="coder" />
                    <div className="w-100">
                        <div className="flex flex-sb flex-left mt-2">
                            <h2>My Profile:</h2>
                            <h3>Data Expert <br /> AI Developer</h3>
                        </div>

                        {/* Phone Input Field */}
                        <div className="flex flex-sb mt-2">
                            <h3>Phone:</h3>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Email Input Field */}
                        <div className="mt-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex flex-center w-100 mt-2">
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>

                <div className="rightlogoutsec">
                    <div className="topaccountbox">
                       
                            <h2 className="flex flex-sb cursor-pointer">
                                My Account <MdOutlineAccountCircle />
                            </h2>
                            <hr />
                            <div className="flex flex-sb mt-1"> 

                                <h3> Active Account <br/> <span>Email</span></h3>
                                <button>Log out</button>
                            </div>
                       
                    </div>
                </div>


            </div>
        </div>
    );
}
