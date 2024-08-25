import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

// POST /data - Process the request and return required fields
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input. 'data' should be an array."
        });
    }

    const numbers: string[] = [];
    const alphabets: string[] = [];
    let highestLowercase = '';

    // Process the data array
    data.forEach(item => {
        if (!isNaN(Number(item))) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && item >= highestLowercase) {
                highestLowercase = item;
            }
        }
    });

    const response = {
        is_success: true,
        user_id: "john_doe_17091999",           // Replace with actual user ID
        email: "john@xyz.com",                  // Replace with actual email
        roll_number: "ABCD123",                 // Replace with actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase]
    };

    res.json(response);
});

// GET /data - Return a simple success response
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        is_success: true,
    });
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});

export default app;
