import { RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";
import LoginLayout from "./LoginLayout";
import { useSession, signOut } from "next-auth/react";



export default function Header({ handleAsideOpen }) {



    const { data: session } = useSession();
    if (session) {


        return <>
            <LoginLayout>
                <header className="flex flex-sb">
                    <div className="logo flex gap-3">
                        <h1>Welcome Talha</h1>
                        <div className="headerham flex flex-center"
                            onClick={handleAsideOpen} >

                            <RiBarChartHorizontalFill />

                        </div>
                    </div>

                    <div className="rightnav flex gap-2">

                        <span>{session.user.email}</span>
                        {/* Logout Button */}
                        <button
                            onClick={() => signOut()}
                            style={{
                                backgroundColor: "#ff4d4d",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "0.3s",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                        >
                            Logout
                        </button>

                        <div className="notification">
                            <img src="/img/notification.png" alt="notification" />
                        </div>
                        <div className="profilenav">
                            <img src="/img/coder.jpeg" alt="user" />

                        </div>


                    </div>



                </header>

            </LoginLayout>

        </>
    }
}