//import Node's web server
const http = require('http')

const posts = [
    {
        id: 'Z0',
        lesson: 0,
        title: 'Intro to screenwriting',
        author: { username: 'Christian Wolf' },
        img: 'https://i.postimg.cc/FRwRJ4HN/context.jpg',
        body: 'In this lesson, we\'ll discuss what it means to be a screenwriter, the implications of working in cultural industries and the way a writer and a story are valued.',
        lorem: true,
        likes: 104,
        tags: ['story', 'industry', 'symbol', 'value', 'high concept', 'community', 'inspiring']
    },
    {
        id: 'A1',
        lesson: 1,
        title: 'From meaning to form',
        author: { username: 'Christian Wolf' },
        img: 'https://i.postimg.cc/hGxwWXC9/symbol.jpg',
        body: 'In this lesson, we\'ll have an overview of the system of symbols that comprises the making of a story for cinema from a semiotics point of view.',
        lorem: true,
        likes: 104,
        tags: ['semiotics', 'signifier', 'signified', 'formula', 'unity', 'meaning', 'emotion']
    },
    {
        id: 'B2',
        lesson: 2,
        title: 'The creation of a Myth',
        author: { username: 'Marisa Havoc' },
        img: 'https://i.postimg.cc/Kcf4Hzyd/myth.png',
        body: 'Using a focused brainstorming technique, we\'ll transform disconnected ideas into a powerful myth, the foundational stone of our screenplay.',
        lorem: true,
        likes: 98,
        tags: ['myth', 'unity', 'inspiring', 'value']
    },
    {
        id: 'C3',
        lesson: 3,
        title: 'The dramatic basis of story',
        author: { username: 'Marisa Havoc' },
        img: 'https://i.postimg.cc/QMh3dpv8/dramatic.jpg',
        body: 'Jumpstart the creation process by completing an overview of the main conflict, your protagonist\'s journey, and the forces against them using the dramatic basis of a story.',
        lorem: true,
        likes: 98,
        tags: ['theme', 'truth', 'lie', 'flaw', 'sin/wound', 'want', 'need', 'logline']
    },
    {
        id: 'D4',
        lesson: 4,
        title: 'The protagonist\'s arc',
        author: { username: 'Nick Brooke' },
        img: 'https://i.postimg.cc/P59M81HD/character.jpg',
        body: 'Our main character sees the world through the eyes of their flawed system of belief, and it will take the transformative power of uncertainty to trigger a change in their lives.',
        lorem: true,
        likes: 75,
        tags: ['belief', 'behavior', 'uncertainty', 'want', 'action', 'character']
    },
    {
        id: 'E5',
        lesson: 5,
        title: 'Write your logline',
        author: { username: 'Pearl Moore' },
        img: 'https://i.postimg.cc/nM8bNrg5/logline.jpg',
        body: 'Let\'s take a chance and use the elements we have so far to come up with the first version of our story, the logline!',
        lorem: true,
        likes: 124,
        tags: ['protagonist', 'flaw', 'want', 'antagonism', 'need']
    },
    {
        id: 'F6',
        lesson: 6,
        title: 'film audience research',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/cJLG8pSv/audience.jpg',
        body: 'Set an objective for your project and compare it with similar movies to get an understanding of the production cycle while also getting to know your audience in a deeper way.',
        lorem: true,
        likes: 82,
        tags: ['love', 'mood']
    },
    {
        id: 'G7',
        lesson: 7,
        title: 'First Pitch Session',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/7YfYJTq3/pitch.jpg',
        body: 'Your time in the spotlight has come! Join us in the first pitch session and put your communicational skills to the test as you present your project in an engaging fashion!',
        lorem: true,
        likes: 82,
        tags: ['pitch', 'protagonist', 'logline', 'research']
    },
    {
        id: 'H8',
        lesson: 8,
        title: 'Story as structure',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/SsSN7CTD/structure.jpg',
        body: 'Lets discuss how a concatenation of symbols can become a narrative, as we explore the evolution of story structures to arrive at the quintescential shape of all stories.',
        lorem: true,
        likes: 82,
        tags: ['pitch', 'protagonist', 'logline', 'research']
    },
    {
        id: 'I9',
        lesson: 9,
        title: 'Opposition & character',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/jds49S29/opposition.jpg',
        body: 'To understand character arc we need to understand the relationship between character, what they want, and any type of opposition preventing them from achieving their objective.',
        lorem: true,
        likes: 82,
        tags: ['character', 'opposition', 'conflict', 'uncertainty', 'behavior', 'character']
    },
    {
        id: 'J10',
        lesson: 10,
        title: 'Scene & Sequence',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/SK3J6DYq/scene.jpg',
        body: 'To understand character arc we need to understand the relationship between character, what they want, and any type of opposition preventing them from achieving their objective.',
        lorem: true,
        likes: 82,
        tags: ['character', 'opposition', 'conflict', 'uncertainty', 'behavior', 'character']
    },
    {
        id: 'K11',
        lesson: 11,
        title: 'Web of characters',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/ydvS4SVx/embodiment.jpg',
        body: 'Character is the embodiment of systems of belief. Let\'s discuss how do these systems come into place and how you can use them to create different characters to suit your narrative.',
        lorem: true,
        likes: 82,
        tags: ['embodiment', 'performance', 'personality', 'culture', 'antagonist', 'allies']
    },
    {
        id: 'L12',
        lesson: 12,
        title: 'Outline First Act',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/RVRfwyrK/first-act.jpg',
        body: 'For a character to be born, they have to destroy a world. Use your dramatic basis to start your story in a normal world, then shatter reality to set a compelling objective.',
        lorem: true,
        likes: 82,
        tags: ['world', 'character', 'flaw', 'contrapositive', 'incident', 'want']
    },
    {
        id: 'M13',
        lesson: 13,
        title: 'Outline Second Act I',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/jjqdGHX7/second-act.jpg',
        body: 'From the moment the protagonist makes the choice of entering the story until they come to know themselves like never before, it is time to face opposition.',
        lorem: true,
        likes: 82,
        tags: ['lock-in', 'antagonism', 'opposition', 'antagonist', 'allies']
    },
    {
        id: 'N14',
        lesson: 14,
        title: 'Outline Second Act II',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/J4ptQdmk/second-act-II.jpg',
        body: 'The most important twist in the story (so far) pushes the protagonist to recognize their limits and, through suffering, they get the necesary motivation to get back into the fight.',
        lorem: true,
        likes: 82,
        tags: ['behavior', 'half-truth', 'soul', 'battle', 'objective']
    },
    {
        id: 'O15',
        lesson: 15,
        title: 'Outline Third Act',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/xCPbVjrs/third-act.jpg',
        body: 'In the final battle, the protagonist needs to put their life on the line to defeat death. Will they learn the truth that will set them free or will they fall into the lie they can\'t let go of?',
        lorem: true,
        likes: 82,
        tags: ['death', 'resurrection', 'self-revelation', 'falling', 'denouement']
    },
    {
        id: 'P16',
        lesson: 16,
        title: 'Dialogue as action',
        author: { username: 'Joyce Bloom' },
        img: 'https://i.postimg.cc/W4RfzVzm/dialogue.jpg',
        body: 'Think of dialogue as another form of action to wield it effectively as catalist for conflict and motion, and break it into components that will allow you to give it a subtext layer.',
        lorem: true,
        likes: 82,
        tags: ['death', 'resurrection', 'self-revelation', 'falling', 'denouement']
    },
]

//createServer method creates a new web server, it uses an eventHandler to manage HTTP requests
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(posts))
})

//Bind web server to app variable, to listen HTTP requests at port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)