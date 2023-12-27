import OpenAI from 'openai'

export async function openai (question: string) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (OPENAI_API_KEY == null) {
    throw new Error('OPENAI_API_KEY is not set in the environment variables.')
  }
  const openai = new OpenAI()
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Who won the world series in 2020?' },
      { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
      { role: 'user', content: 'Where was it played?' }],
    model: 'gpt-3.5-turbo'
  })

  console.log(completion.choices[0])
  return completion.choices[0]
}
