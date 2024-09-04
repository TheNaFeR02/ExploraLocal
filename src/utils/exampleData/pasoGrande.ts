export const elPasoGrande = {
  // id: 2, // This will be auto-generated by Prisma. 'seems to be giving an error if not provided when doing create.'
  image: '/images/paso_grande.jpg', // URL to an image or you can use a base64 string
  title: 'El Paso Grande',
  slug: 'el-paso-grande',
  subtitle: 'A Majestic Landmark in Mompox',
  description: 'El Paso Grande is a majestic landmark in Mompox, celebrated for its grand architecture and historical importance. It stands as a testament to the town’s rich cultural legacy and attracts numerous visitors each year.',
  details: [
    { key: 'yearBuilt', value: '1800' },
    { key: 'architect', value: 'Renowned Architect' },
    { key: 'historicalSignificance', value: 'El Paso Grande has been a central hub for cultural and social activities in Mompox, hosting numerous significant events over the years.' },
    { key: 'currentStatus', value: 'Well-maintained and open to the public' },
  ],
  frequentQuestions: [
    { question: 'What is the best time to visit?', answer: 'The best time to visit is during the festive season from April to June.' },
    { question: 'Are there guided tours available?', answer: 'Yes, guided tours are available every day from 10 AM to 6 PM.' },
    { question: 'Is there an entrance fee?', answer: 'Yes, there is a nominal entrance fee of $5 for adults and $2 for children.' }
  ],
};