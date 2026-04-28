const puter = require('@heyputer/puter.js');
async function test() {
  try {
    const aiResponse = await puter.ai.chat('Hello', { model: 'gemini-3.1-flash-lite-preview' });
    console.log(aiResponse);
  } catch (e) {
    console.error(e);
  }
}
test();
