import express from 'express';
doc.text(data.buyer.address || '');
doc.moveDown();


// Items
doc.text('Items:');
let total = 0;
data.items.forEach((it, i) => {
const lineTotal = (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0);
total += lineTotal;
doc.text(`${i+1}. ${it.description} — ${it.quantity} x ${it.unitPrice} ${data.currency || 'USD'} = ${lineTotal}`);
});


doc.moveDown();
doc.text(`Total: ${total} ${data.currency || 'USD'}`);


doc.end();
doc.pipe(res);


} catch (err) {
console.error('Invoice error', err);
res.status(500).json({ error: err.message || String(err) });
}
});


// Packing list generation (simple CSV or PDF) — returns JSON with the download link (streamed here)
app.post('/api/packinglist', async (req, res) => {
try {
const data = req.body;
if (!data || !Array.isArray(data.items)) return res.status(400).json({ error: 'items[] required' });


const doc = new PDFDocument({ margin: 50 });
const filename = `packinglist-${Date.now()}.pdf`;


res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
res.setHeader('Content-Type', 'application/pdf');


doc.fontSize(18).text('Packing List', { align: 'center' });
doc.moveDown();


data.items.forEach((it, i) => {
doc.text(`${i+1}. ${it.description} — ${it.pieces || 0} pcs — ${it.weight || ''} ${it.weightUnit || ''}`);
});


doc.end();
doc.pipe(res);
} catch (err) {
console.error('Packinglist error', err);
res.status(500).json({ error: err.message || String(err) });
}
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

