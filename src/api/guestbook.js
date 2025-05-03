// pages/api/guestbooks.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await fetch('http://api.nvp.kr/v1/guestbooks');
            if (!response.ok) {
                throw new Error('API 요청 실패');
            }
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Meathod ${req.method}Not Allowed`);
    }
}
