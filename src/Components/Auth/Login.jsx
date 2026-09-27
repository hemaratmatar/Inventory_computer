import { useState } from 'react';
import { Button, Divider, Form, Input, Segmented, Space, Typography } from 'antd';
import { FacebookFilled, GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, facebookProvider, googleProvider } from '../../firebase';

const { Paragraph, Text, Title } = Typography;

const authMessage = (error) => ({
  'auth/account-exists-with-different-credential': 'อีเมลนี้เคยสมัครด้วยช่องทางอื่น กรุณาใช้ช่องทางเดิม',
  'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
  'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/popup-blocked': 'เบราว์เซอร์บล็อกหน้าต่างเข้าสู่ระบบ กรุณาอนุญาต popup',
  'auth/popup-closed-by-user': 'หน้าต่างเข้าสู่ระบบถูกปิดก่อนดำเนินการเสร็จ',
  'auth/unauthorized-domain': 'โดเมนนี้ยังไม่ได้รับอนุญาตใน Firebase Authentication',
  'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
}[error.code] || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง');

export default function Login() {
  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runAuth = async (action) => {
    setError('');
    setLoading(true);
    try {
      await action();
    } catch (authError) {
      setError(authMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = ({ name, email, password }) => runAuth(async () => {
    if (mode === 'signup') {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name.trim() });
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  });

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Inventory Computer">
        <img src="/home.png" alt="Inventory Computer" />
        <div className="visual-caption"><Text>SECURE INVENTORY</Text><p>จัดเก็บและตรวจสอบข้อมูลคอมพิวเตอร์ในที่เดียว</p></div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <span className="auth-logo">IC</span>
            <div><Text className="eyebrow">INVENTORY COMPUTER</Text><Title level={1}>{mode === 'signin' ? 'เข้าสู่ระบบ' : 'สร้างบัญชีใหม่'}</Title></div>
          </div>
          <Paragraph type="secondary">{mode === 'signin' ? 'ยินดีต้อนรับกลับมา กรุณาเลือกวิธีเข้าสู่ระบบ' : 'กรอกข้อมูลเพื่อเริ่มใช้งานระบบ'}</Paragraph>

          <Segmented
            block
            size="large"
            value={mode}
            options={[{ label: 'เข้าสู่ระบบ', value: 'signin' }, { label: 'สมัครสมาชิก', value: 'signup' }]}
            onChange={(value) => { setMode(value); setError(''); }}
          />

          <Form layout="vertical" size="large" onFinish={submitEmail} requiredMark={false} className="auth-form">
            {mode === 'signup' && <Form.Item label="ชื่อผู้ใช้งาน" name="name" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้งาน' }]}><Input prefix={<UserOutlined />} placeholder="ชื่อของคุณ" autoComplete="name" /></Form.Item>}
            <Form.Item label="อีเมล" name="email" rules={[{ required: true, message: 'กรุณากรอกอีเมล' }, { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }]}><Input prefix={<MailOutlined />} placeholder="name@example.com" autoComplete="email" /></Form.Item>
            <Form.Item label="รหัสผ่าน" name="password" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }, { min: 6, message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }]}><Input.Password prefix={<LockOutlined />} placeholder="อย่างน้อย 6 ตัวอักษร" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /></Form.Item>
            {error && <div className="auth-error" role="alert">{error}</div>}
            <Button type="primary" htmlType="submit" loading={loading} block>{mode === 'signin' ? 'เข้าสู่ระบบด้วยอีเมล' : 'สมัครสมาชิกด้วยอีเมล'}</Button>
          </Form>

          <Divider plain>หรือดำเนินการต่อด้วย</Divider>
          <Space orientation="vertical" size="middle" className="social-buttons">
            <Button icon={<GoogleOutlined />} onClick={() => runAuth(() => signInWithPopup(auth, googleProvider))} disabled={loading} block>Google</Button>
            <Button className="facebook-button" icon={<FacebookFilled />} onClick={() => runAuth(() => signInWithPopup(auth, facebookProvider))} disabled={loading} block>Facebook</Button>
          </Space>
          <Text type="secondary" className="auth-footnote">การเข้าใช้งานถือว่าคุณยอมรับนโยบายความปลอดภัยของระบบ</Text>
        </div>
      </section>
    </main>
  );
}
