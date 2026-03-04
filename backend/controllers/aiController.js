const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateFormula = async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
Create a perfume formula for: ${prompt}.

Return ONLY ingredient and percentage.

Format like this:

Bergamot - 5%
Lemon - 4%
Rose Absolute - 20%
Jasmine - 15%
Vanilla - 10%
Sandalwood - 8%

Total must equal 100%.
Do not add explanations.
`,
        },
      ],
    });

    const formula = completion.choices[0].message.content;

    res.json({ formula });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "AI generation failed" });
  }
};