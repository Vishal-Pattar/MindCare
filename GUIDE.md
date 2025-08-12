# MindCare

**MindCare** is an AI-powered companion chatbot designed to provide empathetic, personalized support for individuals facing mild psychological distress.

## Features
- Modular AI architecture including **Compliance**, **Intent Recognition**, **Memory**, **Humanizer**, and **Correction** agents that ensure safe, context-aware, and emotionally resonant responses. :contentReference[oaicite:0]{index=0}
- Designed to offer guidance based on user attributes like gender, age, language, ensuring tailored emotional support.
- Focuses on accessibility, anonymity, and reliability without voice capabilities (yet).

## Technology Stack
- **Frontend:** React.js (MERN stack)
- **Backend:** Node.js + Express.js, MongoDB
- **AI Layer:** Fine-tuned LLaMA 3 via LangChain, CrewAI orchestration, FAISS for RAG retrieval

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB instance (local or cloud)
- Access to the AI model (e.g., fine-tuned LLaMA 3) and credentials

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Vishal-Pattar/MindCare.git
   cd MindCare
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Environment setup**

   * Duplicate `.env.example` and rename it to `.env`
   * Set the following variables:

     ```env
     MONGODB_URI=your_mongo_uri
     LLM_API_KEY=your_model_api_key
     VECTOR_DB_URI=your_vector_db_uri
     ```

4. **Start the development server**

   ```sh
   npm run dev
   ```

5. **Access the app**
   Open your browser and navigate to `http://localhost:3000`

### Production Build

```sh
npm run build && npm start
```

## Demo Video

Watch a live demo of MindCare in action:

<a href="https://youtu.be/4zcr6FmJhcI" target="_blank">
  <img src="https://i9.ytimg.com/vi_webp/f83QiG1XSdw/maxresdefault.webp?v=678ff146&sqp=CPT_7cQG&rs=AOn4CLCAHf-dnRBAYfg7e0SaLe3mQe_tqA" 
       alt="MindCare Demo" 
       width="640" 
       height="360" 
       style="border: 2px solid #ccc; border-radius: 8px;">
</a>

## Roadmap

* Add **voice interaction** features
* Enhance model **accuracy** through fine-tuning and feedback loops
* Introduce **agentic AI** enhancements for more context-aware personalization

## License

This project is licensed under the **MIT License**.

