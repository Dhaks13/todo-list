import Image from "next/image";
import logo from './todo_logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
export default function Page() {
  return (
    <html lang="en">
      <body>
        <Header />
        <Main />
        <Footer />
      </body>
    </html>
  );
}

export function Header() {
  return (
    <header>
      <div className="title-bar">
        <div className="logo">
          <Image src={logo} alt="Todo List App" width={50} height={50} />
        </div>
        <h1>TODO:List App</h1>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search'/>
        <button title="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </header>
  );
}

export function Main() {
  return (
    <main>
      <div className='note-add'>
        <input type='text' placeholder='Add a new task'/>
        <button title="add-button">
          <FontAwesomeIcon className="FontAwesomeIcon" icon={faPlus} />
        </button>
      </div>
    </main>
  );
}


export function Footer() {
  return (
    <footer>
      <p>
        Created by <a href="https://www.linkedin.com/in/dhaks13/">Dhakshin A V</a> 
      </p>   
    </footer>
  )
}
