import React from 'react'
import './ChatHistory.css'
import Markdown from 'markdown-to-jsx';

const ChatHistory = () => {
    return (
        <>
            <div className='chathistory__container'>
                <span className='chathistory__title'>Chat History</span>
            </div>
            <div className='chathistory__box'>
                <div className='chathistory__datetime'>Session Created at: 7/24/2024, 3:20:21 AM</div>
                <div className='chathistory__prompt'>
                    {"How to say Hello in Kannada"}
                </div>
                <div className='chathistory__response'>
                    <pre><Markdown>{"There are a few ways to say \"Hello\" in Kannada, depending on the context and level of formality:\n\n**Informal:**\n\n* **Namaste (ನಮಸ್ತೆ):** This is the most common and polite greeting used for everyone. It literally means \"I bow to you\" and is a gesture of respect.\n* **Namaskara (ನಮಸ್ಕಾರ):** Similar to Namaste, but slightly more formal.\n* **Hello (ಹೆಲೋ):** The English word \"Hello\" is widely used and understood in Kannada.\n\n**Formal:**\n\n* **Shubha prabhatha (ಶುಭ ಪ್ರಭಾತ):** Good morning\n* **Shubha madhyahna (ಶುಭ ಮಧ್ಯಾಹ್ನ):** Good afternoon\n* **Shubha sandhya (ಶುಭ ಸಂಜೆ):** Good evening\n\nYou can also use specific greetings based on the time of day:\n\n* **Suprabhatha (ಸುಪ್ರಭಾತ):** Good morning\n* **Madhyahna (ಮಧ್ಯಾಹ್ನ):** Good afternoon\n* **Sandhya (ಸಂಜೆ):** Good evening\n\n**Note:**\n\n* It's generally considered polite to use \"Namaste\" or \"Namaskara\" as a general greeting.\n* The more formal greetings are typically used in professional or formal settings.\n* You can also use \"Hi\" (ಹಾಯ್) or \"Hey\" (ಹೇ) in informal situations.\n\nIt's always a good idea to learn and use the appropriate greeting based on the situation and your relationship with the person you're speaking to. \n"}</Markdown></pre>
                </div>
                <div className='chathistory__prompt'>
                {"Write \"India\" in all 22 official langauges of India"}
                </div>
                <div className='chathistory__response'>
                    <pre><Markdown>{"Here are the spellings of \"India\" in all 22 official languages of India, to the best of my knowledge:\n\n**1. Assamese:** ভাৰত (Bharat)\n**2. Bengali:** ভারত (Bharat)\n**3. Bodo:** भारत (Bharat)\n**4. Dogri:** भारत (Bharat)\n**5. Gujarati:** ભારત (Bharat)\n**6. Hindi:** भारत (Bharat)\n**7. Kannada:** ಭಾರತ (Bharata)\n**8. Kashmiri:** भारत (Bharat)\n**9. Konkani:** भारत (Bharat)\n**10. Maithili:** भारत (Bharat)\n**11. Malayalam:** ഭാരതം (Bharatam)\n**12. Manipuri:** ভাৰত (Bharat)\n**13. Marathi:** भारत (Bharat)\n**14. Nepali:** भारत (Bharat)\n**15. Odia:** ଭାରତ (Bharat)\n**16. Punjabi:** ਭਾਰਤ (Bharat)\n**17. Sanskrit:** भारतम् (Bhāratam)\n**18. Santali:** ଭାରତ (Bharat)\n**19. Sindhi:** ڀارت (Bharat)\n**20. Tamil:** இந்தியா (Indiya)\n**21. Telugu:** భారతదేశం (Bharatadesam)\n**22. Urdu:** بھارت (Bharat) \n\nPlease note that some languages, like Konkani, have multiple regional dialects, and the spelling might vary slightly based on the dialect. Also, the official romanization of some languages might differ slightly, leading to slight variations in the English spellings. \n"}</Markdown></pre>
                </div>
                <div className='chathistory__datetime'>Session Ended at: 7/24/2024, 3:20:21 AM</div>
            </div>
        </>
    )
}

export default ChatHistory