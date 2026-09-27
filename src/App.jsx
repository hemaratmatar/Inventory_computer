import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  App as AntApp,
  Avatar,
  Button,
  ConfigProvider,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  DesktopOutlined,
  EditOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import Login from './Components/Auth/Login';
import { auth, db } from './firebase';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Paragraph, Text, Title } = Typography;

const sections = {
  products: {
    collection: import.meta.env.VITE_FIRESTORE_PRODUCTS_COLLECTION || 'product-list',
    title: 'รายการคอมพิวเตอร์',
    itemName: 'คอมพิวเตอร์',
    overline: 'PRODUCT LIST',
    emptyText: 'ไม่พบข้อมูลคอมพิวเตอร์ใน Cloud Firestore',
    fields: [
      { key: 'id', label: 'รหัส' },
      { key: 'productname', label: 'ชื่อ' },
      { key: 'status', label: 'สถานะ', status: true },
      { key: 'roomid', label: 'รหัสห้อง' },
      { key: 'roomname', label: 'ชื่อห้อง' },
      { key: 'perid', label: 'รหัสผู้ดูแล' },
      { key: 'pername', label: 'ชื่อผู้ดูแล' },
      { key: 'numlist', label: 'รหัสรายการ' },
    ],
  },
  people: {
    collection: import.meta.env.VITE_FIRESTORE_PEOPLE_COLLECTION || 'per-list',
    title: 'ข้อมูลบุคลากร',
    itemName: 'บุคลากร',
    overline: 'PERSON LIST',
    emptyText: 'ไม่พบข้อมูลบุคลากรใน Cloud Firestore',
    fields: [
      { key: 'perid', label: 'รหัสบุคลากร' },
      { key: 'pername', label: 'ชื่อบุคลากร' },
      { key: 'position', label: 'ตำแหน่ง' },
      { key: 'status', label: 'สถานะ', status: true },
      { key: 'roomid', label: 'รหัสห้อง' },
      { key: 'roomname', label: 'ชื่อห้อง' },
      { key: 'numlist', label: 'รหัสรายการ' },
    ],
  },
  rooms: {
    collection: import.meta.env.VITE_FIRESTORE_ROOMS_COLLECTION || 'room-list',
    title: 'ข้อมูลห้อง',
    itemName: 'ห้อง',
    overline: 'ROOM LIST',
    emptyText: 'ไม่พบข้อมูลห้องใน Cloud Firestore',
    fields: [
      { key: 'roomid', label: 'รหัสห้อง' },
      { key: 'roomname', label: 'ชื่อห้อง' },
      { key: 'point', label: 'สถานที่' },
      { key: 'perid', label: 'รหัสผู้ดูแล' },
      { key: 'pername', label: 'ชื่อผู้ดูแล' },
    ],
  },
};

const menuItems = [
  { key: 'home', icon: <HomeOutlined />, label: 'หน้าหลัก' },
  {
    key: 'computer',
    icon: <DesktopOutlined />,
    label: 'คอมพิวเตอร์',
    children: [{ key: 'products', label: 'รายการคอมพิวเตอร์' }],
  },
  { key: 'people', icon: <TeamOutlined />, label: 'บุคลากร' },
  { key: 'rooms', icon: <AppstoreOutlined />, label: 'ห้อง' },
  { key: 'about', icon: <InfoCircleOutlined />, label: 'เกี่ยวกับระบบ' },
];

const systemFeatures = [
  { icon: <DesktopOutlined />, title: 'ทะเบียนคอมพิวเตอร์', text: 'เพิ่ม แก้ไข ค้นหา ดูรายละเอียด และลบข้อมูลคอมพิวเตอร์ พร้อมสถานะ ห้อง และผู้ดูแล' },
  { icon: <TeamOutlined />, title: 'ข้อมูลบุคลากร', text: 'จัดเก็บรหัส ชื่อ ตำแหน่ง สถานะ และความสัมพันธ์ระหว่างบุคลากรกับห้องหรือครุภัณฑ์' },
  { icon: <AppstoreOutlined />, title: 'ข้อมูลห้อง', text: 'จัดการห้อง สถานที่ และผู้รับผิดชอบ เพื่อระบุตำแหน่งใช้งานของคอมพิวเตอร์ได้ชัดเจน' },
  { icon: <DatabaseOutlined />, title: 'Cloud Firestore', text: 'ข้อมูลทุกหมวดจัดเก็บบนระบบคลาวด์และปรับปรุงหน้า Dashboard แบบเรียลไทม์' },
  { icon: <SearchOutlined />, title: 'ค้นหาและตรวจสอบ', text: 'ค้นหารหัส ชื่อ สถานะ ห้อง ผู้ดูแล หรือสถานที่จากข้อมูลแต่ละหมวดได้อย่างรวดเร็ว' },
  { icon: <SafetyCertificateOutlined />, title: 'ควบคุมการเข้าถึง', text: 'รองรับการเข้าสู่ระบบด้วยอีเมล Google และ Facebook ก่อนอ่านหรือจัดการข้อมูลหน่วยงาน' },
];

const displayValue = (value) => value === undefined || value === null || value === '' ? '-' : String(value);

function AboutSystem() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <Text className="eyebrow">INVENTORY COMPUTER</Text>
        <Title level={2}>ระบบจัดการและบันทึกข้อมูลคอมพิวเตอร์ภายในหน่วยงาน</Title>
        <Paragraph style={{ color: '#fff' }}>
          ศูนย์กลางสำหรับบันทึก ตรวจสอบ และดูแลข้อมูลครุภัณฑ์คอมพิวเตอร์ บุคลากรผู้รับผิดชอบ
          และห้องที่ติดตั้ง ช่วยให้หน่วยงานทราบว่ามีอุปกรณ์อะไร อยู่ที่ใด และใครเป็นผู้ดูแล
        </Paragraph>
        <div className="about-status"><CheckCircleOutlined /> ข้อมูลเชื่อมต่อกับ Cloud Firestore แบบเรียลไทม์</div>
      </section>

      <section className="feature-grid">
        {systemFeatures.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-icon">{feature.icon}</span>
            <Title level={3}>{feature.title}</Title>
            <Paragraph>{feature.text}</Paragraph>
          </article>
        ))}
      </section>

      <section className="workflow-card">
        <Text className="eyebrow">การทำงานของระบบ</Text>
        <Title level={3}>วงจรการจัดการข้อมูล</Title>
        <div className="workflow-steps">
          {['เข้าสู่ระบบอย่างปลอดภัย', 'บันทึกข้อมูลคอมพิวเตอร์ บุคลากร และห้อง', 'ค้นหาและแก้ไขข้อมูลให้เป็นปัจจุบัน', 'ตรวจสอบสถานะและผู้รับผิดชอบได้ทันที'].map((step, index) => (
            <div key={step}><strong>{index + 1}</strong><span>{step}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Dashboard({ user }) {
  const { message } = AntApp.useApp();
  const [form] = Form.useForm();
  const [activeSection, setActiveSection] = useState('products');
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [recordsError, setRecordsError] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingKey, setDeletingKey] = useState('');
  const section = sections[activeSection];
  const isAbout = activeSection === 'about';

  useEffect(() => {
    setRecords([]);
    setRecordsError('');
    setQuery('');
    setSelected(null);
    setEditor(null);

    if (!sections[activeSection]) {
      setRecordsLoading(false);
      return undefined;
    }

    setRecordsLoading(true);
    return onSnapshot(
      collection(db, sections[activeSection].collection),
      (snapshot) => {
        setRecords(snapshot.docs.map((recordDocument) => {
          const data = recordDocument.data();
          return { key: recordDocument.id, ...data, id: data.id ?? recordDocument.id };
        }));
        setRecordsLoading(false);
      },
      (error) => {
        console.error('Firestore subscription failed:', error);
        setRecordsError(error.code === 'permission-denied'
          ? 'บัญชีนี้ไม่มีสิทธิ์เข้าถึงข้อมูลจาก Cloud Firestore'
          : 'ไม่สามารถเชื่อมต่อ Cloud Firestore ได้ กรุณาลองใหม่อีกครั้ง');
        setRecordsLoading(false);
      },
    );
  }, [activeSection]);

  const filteredRecords = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return records;
    return records.filter((record) =>
      Object.values(record).some((value) => String(value).toLowerCase().includes(keyword)),
    );
  }, [query, records]);

  const openEditor = (record = null) => {
    form.resetFields();
    if (record) form.setFieldsValue(record);
    setEditor(record ? { mode: 'edit', record } : { mode: 'create' });
  };

  const saveRecord = async (values) => {
    setSaving(true);
    const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
    try {
      if (editor.mode === 'edit') {
        await updateDoc(doc(db, section.collection, editor.record.key), { ...payload, updatedAt: serverTimestamp() });
        message.success(`แก้ไขข้อมูล${section.itemName}แล้ว`);
      } else {
        await addDoc(collection(db, section.collection), { ...payload, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        message.success(`เพิ่มข้อมูล${section.itemName}แล้ว`);
      }
      setEditor(null);
      form.resetFields();
    } catch (error) {
      console.error('Firestore write failed:', error);
      message.error(error.code === 'permission-denied' ? 'บัญชีนี้ไม่มีสิทธิ์แก้ไขข้อมูล' : 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่');
    } finally {
      setSaving(false);
    }
  };

  const removeRecord = async (record) => {
    setDeletingKey(record.key);
    try {
      await deleteDoc(doc(db, section.collection, record.key));
      message.success(`ลบข้อมูล${section.itemName}แล้ว`);
    } catch (error) {
      console.error('Firestore delete failed:', error);
      message.error(error.code === 'permission-denied' ? 'บัญชีนี้ไม่มีสิทธิ์ลบข้อมูล' : 'ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่');
    } finally {
      setDeletingKey('');
    }
  };

  const columns = section?.fields.map((field) => ({
    title: field.label,
    dataIndex: field.key,
    render: (value) => field.status && value
      ? <Tag color={String(value).toLowerCase() === 'user' || value === 'ใช้งาน' ? 'success' : 'default'}>{value}</Tag>
      : displayValue(value),
  })).concat({
    title: 'จัดการ',
    key: 'action',
    fixed: 'right',
    width: 220,
    render: (_, record) => (
      <Space size="small">
        <Button type="link" onClick={() => setSelected(record)}>ดู</Button>
        <Button type="link" icon={<EditOutlined />} onClick={() => openEditor(record)}>แก้ไข</Button>
        <Popconfirm
          title={`ลบข้อมูล${section.itemName}?`}
          description="ข้อมูลที่ลบแล้วไม่สามารถกู้คืนจากหน้านี้ได้"
          okText="ลบข้อมูล"
          cancelText="ยกเลิก"
          okButtonProps={{ danger: true }}
          onConfirm={() => removeRecord(record)}
        >
          <Button type="link" danger icon={<DeleteOutlined />} loading={deletingKey === record.key}>ลบ</Button>
        </Popconfirm>
      </Space>
    ),
  }) || [];

  const selectMenu = ({ key }) => setActiveSection(key === 'home' ? 'products' : key);

  return (
    <Layout className="dashboard-shell">
      <Sider breakpoint="lg" collapsedWidth="0" width={248} className="sidebar">
        <div className="sidebar-brand"><span>IC</span> Inventory</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['computer']}
          selectedKeys={[activeSection]}
          items={menuItems}
          onClick={selectMenu}
        />
        <Button className="signout" type="text" icon={<LogoutOutlined />} onClick={() => signOut(auth)}>ออกจากระบบ</Button>
      </Sider>

      <Layout>
        <Header className="topbar">
          <div>
            <Text className="eyebrow">ระบบจัดการครุภัณฑ์</Text>
            <Title level={1}>{isAbout ? 'เกี่ยวกับระบบ' : section.title}</Title>
          </div>
          <Space className="profile">
            <Avatar src={user.photoURL || undefined} size={44}>{(user.displayName || user.email || 'U')[0]}</Avatar>
            <div><Text strong>{user.displayName || 'ผู้ใช้งาน'}</Text><Text type="secondary">{user.email}</Text></div>
          </Space>
        </Header>

        <Content className="dashboard-content">
          {isAbout ? <AboutSystem /> : (
            <>
              <section className="search-panel">
                <div>
                  <Text className="field-label">ค้นหาข้อมูล</Text>
                  <Input
                    allowClear
                    size="large"
                    prefix={<SearchOutlined />}
                    placeholder="พิมพ์รหัส ชื่อ สถานะ หรือสถานที่"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                <div className="summary-card"><strong>{filteredRecords.length}</strong><span>รายการที่พบ</span></div>
              </section>

              <section className="table-card">
                <div className="section-heading">
                  <div><Text className="eyebrow">{section.overline}</Text><Title level={2}>{section.title}</Title></div>
                  <Space wrap>
                    <Tag color={recordsError ? 'error' : recordsLoading ? 'processing' : 'cyan'}>
                      {recordsError ? 'เชื่อมต่อไม่สำเร็จ' : recordsLoading ? 'กำลังโหลด' : 'Firestore realtime'}
                    </Tag>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>เพิ่ม{section.itemName}</Button>
                  </Space>
                </div>
                {recordsError && <Alert className="database-alert" type="error" showIcon title={recordsError} />}
                <Table
                  loading={recordsLoading}
                  columns={columns}
                  dataSource={filteredRecords}
                  scroll={{ x: 1100 }}
                  pagination={{ pageSize: 10, hideOnSinglePage: true }}
                  locale={{ emptyText: section.emptyText }}
                />
              </section>
            </>
          )}
        </Content>
      </Layout>

      <Modal
        open={Boolean(selected)}
        onCancel={() => setSelected(null)}
        footer={null}
        title={selected && section ? displayValue(selected[section.fields[1].key]) : ''}
        centered
      >
        {selected && section && (
          <div className="detail-grid">
            {section.fields.map((field) => (
              <div key={field.key}><Text type="secondary">{field.label}</Text><Text strong>{displayValue(selected[field.key])}</Text></div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(editor)}
        title={editor?.mode === 'edit' ? `แก้ไขข้อมูล${section?.itemName}` : `เพิ่มข้อมูล${section?.itemName}`}
        okText="บันทึกข้อมูล"
        cancelText="ยกเลิก"
        confirmLoading={saving}
        onOk={() => form.submit()}
        onCancel={() => setEditor(null)}
        width={720}
        centered
        destroyOnHidden
      >
        {section && (
          <Form form={form} layout="vertical" onFinish={saveRecord} requiredMark="optional" className="record-form">
            {section.fields.map((field) => (
              <Form.Item
                key={field.key}
                name={field.key}
                label={field.label}
                rules={[{ required: true, whitespace: true, message: `กรุณากรอก${field.label}` }]}
              >
                <Input placeholder={`กรอก${field.label}`} maxLength={120} />
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </Layout>
  );
}

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#ff6b63', borderRadius: 10, fontFamily: 'Inter, "Noto Sans Thai", sans-serif' },
        components: { Layout: { siderBg: '#061c2d' }, Menu: { darkItemBg: '#061c2d', darkItemSelectedBg: '#ff6b63' } },
      }}
    >
      <AntApp>
        {user === undefined ? <div className="loading-screen"><span className="spinner" />กำลังตรวจสอบการเข้าสู่ระบบ</div> : user ? <Dashboard user={user} /> : <Login />}
      </AntApp>
    </ConfigProvider>
  );
}
