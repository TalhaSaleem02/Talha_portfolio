import Courses from '@/components/Course';
import { SiBloglovin } from "react-icons/si";

export default function addphoto() {



    return <>
     
      <div className="addblogspage">
                      <div className="titledashboard flex flex-sb">
                          <div>
                              <h2>Add <span>Courses </span></h2>
                              <h3> Admin Panel</h3>
                          </div>
          
                          <div className="breadcrumb">
                              
                              <SiBloglovin /> <span>/</span> <span>Add Courses </span>
                          </div> 
                          
                      </div>
                      <div className="blogsadd">
                          <Courses />
                      </div>
                  </div>
         </>

    

}