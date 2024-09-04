/**
 * @jest-environment node
 */
import { GET } from './route'
import { prismaMock } from '@/singleton'


test('should return data with status 200', async () => {
  const mockObject = {
    id: 9,
    image: '/images/paso_robao.jpg',
    title: 'El Paso Robao',
    slug: 'el-paso-robao',
    subtitle: 'A Historical Landmark in Mompox',
    description: 'El Paso Robao is a historic landmark in Mompox known for its rich cultural heritage and architectural beauty. It is an essential part of the town’s history and a popular site for visitors.',
    createdAt: new Date(),
    details: [
      { key: 'Year Built', value: '1780' },
      { key: 'Architect', value: 'Unknown' },
      { key: 'Historical Significance', value: 'This building has served various purposes over the centuries, including as a government office and a meeting place for local leaders.' },
      { key: 'Current Status', value: 'Preserved and open to the public' },
    ],
    frequentQuestions: [
      { question: 'What is the best time to visit?', answer: 'The best time to visit is during the dry season from December to March.' },
      { question: 'Are there guided tours available?', answer: 'Yes, guided tours are available every day from 9 AM to 5 PM.' },
      { question: 'Is there an entrance fee?', answer: 'No, the entrance is free for all visitors.' },
    ],
  }

  prismaMock.object.findUnique.mockResolvedValue(mockObject)

  const params = { id: '9' }
  const response = await GET({ params })
  const body = await response.json()
  expect(response.status).toBe(200)
  expect(body).toEqual({
    id: 9,
    image: '/images/paso_robao.jpg',
    title: 'El Paso Robao',
    slug: 'el-paso-robao',
    subtitle: 'A Historical Landmark in Mompox',
    description: 'El Paso Robao is a historic landmark in Mompox known for its rich cultural heritage and architectural beauty. It is an essential part of the town’s history and a popular site for visitors.',
    createdAt: expect.any(String),
    details: [
      { key: 'Year Built', value: '1780' },
      { key: 'Architect', value: 'Unknown' },
      { key: 'Historical Significance', value: 'This building has served various purposes over the centuries, including as a government office and a meeting place for local leaders.' },
      { key: 'Current Status', value: 'Preserved and open to the public' },
    ],
    frequentQuestions: [
      { question: 'What is the best time to visit?', answer: 'The best time to visit is during the dry season from December to March.' },
      { question: 'Are there guided tours available?', answer: 'Yes, guided tours are available every day from 9 AM to 5 PM.' },
      { question: 'Is there an entrance fee?', answer: 'No, the entrance is free for all visitors.' },
    ],
  }
  )
})

test('should return 400 for invalid ID format', async () => {
  const params = { id: 'invalid' } // using a string instead of a valid Id
  const response = await GET({ params })
  const body = await response.json()

  prismaMock.object.findUnique.mockResolvedValue(null)

  expect(response.status).toBe(400)
  expect(body.error).toBe('Invalid format id. Page not found.')
})


test('should return 400 for ID not found in the database', async () => {
  const params = { id: '-1' } // using a string instead of a valid Id
  const response = await GET({ params })
  const body = await response.json()

  prismaMock.object.findUnique.mockResolvedValue(null)

  expect(response.status).toBe(400)
  expect(body.error).toBe('Id not found. Object may not exist in the database. Page not found')
})
