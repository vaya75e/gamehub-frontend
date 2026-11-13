
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm';

// Test 1
test('ยังไม่พิมพ์อะไร ปุ่มส่งต้องกดไม่ได้', () => {
  render(<ReviewForm gameTitle="เกมทดสอบ" onSubmit={jest.fn()} />);

  expect(screen.getByRole('button', { name: 'ส่งรีวิว' })).toBeDisabled();
});

// Test 2
test('พิมพ์รีวิวแล้วกดส่ง ต้องเรียก onSubmit พร้อมข้อความและคะแนน', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn().mockResolvedValue();

  render(<ReviewForm gameTitle="เกมทดสอบ" onSubmit={onSubmit} />);

  await user.type(
    screen.getByPlaceholderText('เขียนความคิดเห็นของคุณเกี่ยวกับเกมนี้...'),
    'สนุกมาก ฉากแอ็กชันดี'
  );

  await user.click(screen.getByRole('button', { name: 'ส่งรีวิว' }));

  expect(onSubmit).toHaveBeenCalledWith('สนุกมาก ฉากแอ็กชันดี', 5);
});

// Test 3
test('ถ้า onSubmit โยน Error ต้องแสดงข้อความและยังแก้ไขรีวิวได้', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn().mockRejectedValue(
    new Error('รีวิวสั้นเกินไป')
  );

  render(<ReviewForm gameTitle="เกมทดสอบ" onSubmit={onSubmit} />);

  const textarea = screen.getByPlaceholderText(
    'เขียนความคิดเห็นของคุณเกี่ยวกับเกมนี้...'
  );

  await user.type(textarea, 'รีวิวนี้มีข้อความยาวเพียงพอ');
  await user.click(screen.getByRole('button', { name: 'ส่งรีวิว' }));

  expect(await screen.findByText('รีวิวสั้นเกินไป')).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(textarea).toHaveValue('รีวิวนี้มีข้อความยาวเพียงพอ');
  expect(screen.getByRole('button', { name: 'ส่งรีวิว' })).toBeInTheDocument();
});
