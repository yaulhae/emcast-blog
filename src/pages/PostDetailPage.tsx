import { useParams } from 'react-router-dom'

export default function PostDetailPage() {
  const { id } = useParams()
  return <div>📄 게시글 상세 페이지 (ID: {id})</div>
}
