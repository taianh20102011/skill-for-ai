"""
Hệ thống Long-term Memory cho AI Agent sử dụng Mem0.
Trích xuất entities, relationships và cập nhật vector/graph memory theo session.
"""

import os
import json

def get_mem0_client():
    try:
        from mem0 import Memory
        config = {
            "vector_store": {
                "provider": "chroma",
                "config": {
                    "collection_name": "anti_slop_agent_memory",
                    "path": "./chroma_db",
                }
            }
        }
        return Memory.from_config(config)
    except ImportError:
        print("[!] Thư viện mem0ai chưa được cài đặt. Chạy: py -m pip install mem0ai chromadb")
        return None

def record_learning(agent_id: str, learning_content: str):
    m = get_mem0_client()
    if not m:
        return
    print(f">>> Ghi nhớ bài học vào Mem0 cho agent '{agent_id}': {learning_content}")
    m.add(learning_content, user_id=agent_id)

def query_memory(agent_id: str, query: str):
    m = get_mem0_client()
    if not m:
        return []
    results = m.search(query, user_id=agent_id)
    return results

if __name__ == "__main__":
    print("Mem0 Agent Memory Ready.")
