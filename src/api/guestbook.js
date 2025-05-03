export default async function handler(req, res) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.nvp.kr';

    try {
        if (req.method === 'GET') {
            // 방명록 목록 가져오기
            const response = await fetch(`${apiUrl}/guestbooks`);

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        }
        else if (req.method === 'POST') {
            // 방명록 작성하기
            const response = await fetch(`${apiUrl}/guestbooks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API 요청 오류:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 500,
                message: error.message || 'Internal Server Error'
            }
        });
    }
}