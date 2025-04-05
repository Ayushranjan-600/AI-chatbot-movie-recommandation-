document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Predefined bot responses
    const botResponses = [
        // General fallback responses
        "I'm sorry, I don't understand. Could you rephrase that?",
        "That's an interesting point! Let me think about that...",
        "I'm just a simple movie chatbot here to discuss films with you!",
        "Thanks for chatting with me today!",
        "Did you know this movie chatbot runs entirely in your browser?",
        "Sorry , i didn't get you!",
        
        // // Movie-focused fallbacks
        // "I love talking about movies! What's your favorite film?",
        // "That's a great observation about movies!",
        // "I'm designed to chat about films without server-side processing.",
        // "The weather is always perfect for movie-watching in this virtual chat!",
        // "Have you tried asking about a specific movie or actor?",
        
        // Movie discussion prompts
        // "I can discuss any movie genre you're interested in!",
        // "Looking to talk about recent releases or classic films?",
        // "Did you know 'The Shawshank Redemption' is often ranked as the best movie of all time?",
        // "What's your preferred movie-watching snack? I'm partial to virtual popcorn!",
        // "Lights, camera, conversation! What shall we discuss?",
        
        // // Streaming/service mentions
        // "There are so many great streaming options now - where do you usually watch movies?",
        // "Have you discovered any hidden gem movies lately?",
        // "Do you prefer watching movies at home or in theaters?",
        
        // // International cinema
        // "The global film industry is so fascinating! Any favorite international movies?",
        // "From Hollywood to Bollywood to K-dramas - so many great films to discuss!",
        
        // // Technical fallbacks
        // "I might be a simple bot, but I know my movies!",
        // "Ask me about actors, directors, or any film-related topic!"
    ];

    // Simple keyword responses
    const keywordResponses = {
        "hello": "Hello there! How can I assist you today?",
        "hi": "Hi! Nice to meet you. What's on your mind?",
        "hey": "Hey! How can I help you today?",
        "help": "I can answer simple questions and chat with you. Try asking me something!",
        "name": "I'm just a simple chatbot with no name. You can call me Bot!",
        "how are you": "I'm just a program, so I don't have feelings, but thanks for asking!",
        "bye": "Goodbye! Feel free to come back and chat anytime.",
        "goodbye": "Take care! Have a great day ahead.",
        "thanks": "You're welcome! Is there anything else I can help with?",
        "thank you": "My pleasure! Let me know if you have other questions.",
        
        // General movie-related responses
        "more movies":"Sorry , I don't have that much info!",
        "who are you":"I am a simple bot for movies recommendations , trained by your data 😊",
        "do you like movies": "I can't watch movies, but I can definitely talk about them!",
        "what is your favorite movie": "I don’t have personal preferences, but many people love classics like 'The Godfather' or 'Inception'!",
        "recommend a movie": "It depends on what you like! Do you prefer action, comedy, horror, or something else?",
        "best movie of all time": "That's tough! Some say 'The Shawshank Redemption', while others love 'The Dark Knight'. What do you think?",
        "do you watch movies": "I don’t have eyes, but I can definitely help you find a great movie to watch!",
        "suggest me sci-fi movie": "How about 'Interstellar'? It’s a fantastic mix of science and adventure! ,here you can download ->(https://hdhub4u.cricket/)",
        "suggest me comedy movie": "You might enjoy 'Superbad' or 'The Hangover' if you like comedy! , here you can download ->(https://hdhub4u.cricket/)",
        "suggest me horror movie": "If you like horror, you could try 'The Conjuring' or 'Hereditary'! , here you can download ->(https://hdhub4u.cricket/)",
        "suggest me romantic movie": "You might love 'The Notebook' or 'Pride and Prejudice'! , here you can download ->(https://hdhub4u.cricket/)",
        "suggest me thriller movie": "How about 'Gone Girl' or 'Se7en'? Both are full of suspense! , here you can download ->(https://hdhub4u.cricket/)",
        "suggest an animated movie": "You can't go wrong with 'Toy Story' or 'Spider-Man: Into the Spider-Verse'! , here you can download ->(https://hdhub4u.cricket/)",
        "who is your favorite actor": "I don't have favorites, but actors like Leonardo DiCaprio and Meryl Streep are widely loved! , here you can download ->(https://hdhub4u.cricket/)",
        "who is your favorite actress": "There are so many talented actresses! Maybe someone like Scarlett Johansson or Emma Stone?",
        "what's a good movie to watch tonight": "What mood are you in? Action, comedy, drama, or something else?",
        "do you like Marvel movies": "Marvel movies are super popular! 'Avengers: Endgame' was a massive hit!",
        "do you like DC movies": "DC has some great movies too! 'The Dark Knight' is a classic.",
        "who is the best superhero": "That's a tough one! Some love Iron Man, while others swear by Batman!",
        "what's the best animated movie": "There are so many! 'Up', 'Coco', and 'Shrek' are fan favorites!",
        "what's the highest-grossing movie": "As of now, 'Avatar' and 'Avengers: Endgame' are among the highest-grossing films ever!",
        "who is the greatest director": "Directors like Christopher Nolan, Steven Spielberg, and Quentin Tarantino are highly regarded!",
        "what's a good movie for a date night": "'La La Land' or 'Titanic' could be a great choice for a romantic evening!",
        "what's a good action movie": "'Mad Max: Fury Road' and 'John Wick' are awesome action-packed films!",
        "what's a classic movie everyone should watch": "'The Godfather', 'Casablanca', and 'Forrest Gump' are timeless classics!",
        "what's a good movie for kids": "'Finding Nemo', 'Moana', and 'The Lion King' are perfect for kids!",
        "what's the scariest movie": "'The Exorcist' and 'The Shining' are some of the scariest movies ever made!",
        "what's the funniest movie": "'Step Brothers' and 'Dumb and Dumber' are hilarious!",
        "what's a great mystery movie": "'Knives Out' and 'The Girl with the Dragon Tattoo' are great mystery thrillers!",
        "what's the best fantasy movie": "'The Lord of the Rings' and 'Harry Potter' series are must-watches for fantasy lovers!",
        "what's a good documentary": "'Planet Earth' and 'The Social Dilemma' are highly recommended documentaries!",
        "what's a good movie for family": "'Home Alone' and 'Paddington' are great family-friendly movies!",
        "do you know Bollywood movies": "Yes! Bollywood has amazing films like '3 Idiots', 'Dangal', and 'Zindagi Na Milegi Dobara'!",
        "what's the best Bollywood movie": "'Sholay' is a classic, but 'Gully Boy' and 'Lagaan' are also highly rated!",
        "who is the biggest Bollywood star": "Shah Rukh Khan, Amitabh Bachchan, and Salman Khan are some of the biggest stars in Bollywood!",
        "what's a good k-drama movie": "'Parasite' is an amazing Korean film, and 'Train to Busan' is a great thriller!",
        
        // Fun movie-related interactions
        "lights, camera, action": "Are we making a movie? Let's do this!",
        "I love movies": "That's great! Movies can take us to amazing worlds and tell powerful stories!",
        "can you be my movie buddy": "Of course! I can suggest movies, discuss plots, and even share trivia with you!",
        "do you know any movie trivia": "Sure! Did you know that 'The Lion King' was almost called 'King of the Jungle'?",
        "tell me a fun movie fact": "Here's one: The famous 'I’m the king of the world!' line in 'Titanic' was improvised by Leonardo DiCaprio!",
        "tell me another movie fact": "Okay! Did you know the snow in 'The Wizard of Oz' was actually made of asbestos?",
        
        "do you like popcorn": "If I could eat, I bet I'd love it! Especially with butter!",
        "what's the best movie snack": "Popcorn is a classic, but nachos and candy are great too!",
        
        "can you act": "I wish I could, but I can definitely quote movies! 'May the Force be with you!'",
        "say a famous movie line": "'I'll be back!' - The Terminator",
        "what's your favorite movie quote": "'Why so serious?' - The Dark Knight",
        
        "who should win an Oscar": "There are always amazing performances every year! Who do you think should win?",
        "have you ever been in a movie": "Not yet, but maybe one day a chatbot will star in a film!",
        
        "can you guess my favorite movie": "That’s a tough one! Maybe you love action movies like 'Avengers', or do you prefer comedies like 'Superbad'?",
        
        "can you recommend a movie streaming service": "Netflix, Disney+, Amazon Prime, and HBO Max are great choices!",
        
        "do you like TV shows": "I can't watch them, but I hear 'Breaking Bad' and 'Stranger Things' are really popular!",
        "what's the best TV show": "That's a hard one! 'Game of Thrones', 'Friends', and 'The Office' are all amazing in different ways!",
        "suggest a Netflix series": "'Stranger Things', 'Money Heist', and 'The Witcher' are great Netflix picks!",
        "suggest me some action movies":"The Dark Knight (2008) , Mad Max: Fury Road (2015), John Wick (2014)",
        // Other existing responses
        "do you sleep": "Nope, I’m always here and ready to chat whenever you need!",
        "can you sing": "I wish I could, but I might just sound like a bunch of beeps!",
        "do you like humans": "Of course! I exist to help and interact with humans like you!"
    };

    // Function to add a message to the chat
    function addMessage(sender, text, isTyping = false) {
       
        // Remove any existing bot typing message before adding a new one
        if (sender === 'bot' && isTyping) {
            const typingElements = document.querySelectorAll('.bot-message .message-content p');
            typingElements.forEach(el => {
                if (el.innerHTML.includes("<span class='dot'></span>")) {
                    el.parentElement.parentElement.remove();
                }
            });
        }
    
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
    
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
    
        const senderDiv = document.createElement('div');
        senderDiv.className = 'message-sender';
        senderDiv.textContent = sender === 'user' ? '' : "";
    
        const textP = document.createElement('p');
        textP.textContent = text;
    
        contentDiv.appendChild(senderDiv);
        contentDiv.appendChild(textP);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
    
        // Apply typing animation for bot messages
        if (isTyping) {
            textP.innerHTML = "<span class='dot'></span><span class='dot'></span><span class='dot'></span>";
        }
    
        // Auto-scroll to the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    // Function to generate a bot response
    // function getBotResponse(userText) {
    //     const lowerText = userText.toLowerCase();
    //     const genres = Object.keys(movieDatabase);
    //     const foundGenre = genres.find(genre => lowerText.includes(genre));

    //     if (foundGenre) {
    //         return `For ${foundGenre}, I recommend: ${movieDatabase[foundGenre].join(", ")}`;
    //     }

    //     if (lowerText.includes('movie') || lowerText.includes('film')) {
    //         return "I can recommend movies! Tell me a genre like action, comedy, horror, or sci-fi.";
    //     }
    function getBotResponse(userText) {
        const lowerText = userText.toLowerCase();
    
        // First check for exact keyword matches
        for (const [keyword, response] of Object.entries(keywordResponses)) {
            if (lowerText.includes(keyword)) {
                return response;
            }
        }

        for (const [keyword, response] of Object.entries(keywordResponses)) {
            if (lowerText.includes(keyword)) {
                return response;
            }
        }

        if (lowerText.includes('?')) {
            return "That's a good question. Unfortunately, I'm just a demo chatbot without real knowledge.";
        }

        return botResponses[Math.floor(Math.random() * botResponses.length)];
    }

    // Handle send button click
    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // Handle Enter key in input field
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Main function to process and send messages
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';

            // Add typing animation before response
            addMessage('bot', 'Typing...', true);

            setTimeout(() => {
                // Remove typing animation
                chatMessages.lastChild.remove();

                // Add bot response
                const response = getBotResponse(message);
                addMessage('bot', response);
            }, 1200);
        }
    }
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = '<span class="typing">Chat Assistant is typing...</span>';

        chatMessages.appendChild(typingDiv);
        return typingDiv;
    }
    


   function sendMessage() {
    const message = userInput.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive match
    if (message === "clear") {
        chatMessages.innerHTML = ""; // Clears all chat messages
        userInput.value = ""; // Clears input field
        return;
    }

    if (message) {
        addMessage('user', message);
        userInput.value = '';

        // Add typing animation before response
        addMessage('bot', 'Typing...', true);
        const typingIndicator = addTypingIndicator();

        setTimeout(() => {
            // Remove typing animation
            chatMessages.lastChild.remove();

            // Add bot response
            const response = getBotResponse(message);
            addMessage('bot', response);
        }, 1200);
    }
}
});



