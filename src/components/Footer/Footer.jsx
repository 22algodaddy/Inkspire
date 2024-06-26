import {Link} from "react-router-dom"
import Logo from "../Logo"
export default function Footer(){
    return(
        <footer className="bottom-0 left-0 w-full flex flex-col items-center justify-center space-y-30 p-10 bg-gray-400" 
           
        > 


        <nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
            <a class="hover:text-gray-900" href="/">Home</a>
            <a class="hover:text-gray-900" href="#">About</a>
            <a class="hover:text-gray-900" href="#">Services</a>
            <a class="hover:text-gray-900" href="#">Media</a>
            <a class="hover:text-gray-900" href="#">Gallery</a>
            <a class="hover:text-gray-900" href="#">Contact</a>
        </nav>
    
        <div class="flex justify-center space-x-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
            </a>
            <a href="https://www.linkedin.com/in/dhruv-choubey-9a3296144/" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
            </a>
            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
            </a>
        </div>
        <p class="text-center text-gray-700 font-medium">&copy; 2024 Company Ltd. All rights reservered.</p>
    </footer>
    )
}