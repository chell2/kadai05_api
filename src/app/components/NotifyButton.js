import Link from 'next/link';

const NotifyButton = () => (
  <Link href="/api/line-auth">
    <button className="bg-primary text-neutral hover:bg-secondary p-3 rounded-lg">
      <small>LINE通知先を登録</small>
    </button>
  </Link>
);

export default NotifyButton;
