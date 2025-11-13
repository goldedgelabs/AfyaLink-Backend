from flask import Flask, request, jsonify
import os, time, requests
app = Flask(__name__)
NEURO_URL = os.environ.get('NEUROEDGE_API_URL')
NEURO_KEY = os.environ.get('NEUROEDGE_API_KEY')
OPENAI_KEY = os.environ.get('OPENAI_API_KEY')

def call_neuro(prompt):
    if not NEURO_URL or not NEURO_KEY:
        raise RuntimeError('NeuroEdge not configured')
    r = requests.post(NEURO_URL, json={'prompt': prompt}, headers={'Authorization': f'Bearer {NEURO_KEY}'}, timeout=8)
    r.raise_for_status()
    return r.json()

def call_openai(prompt):
    if not OPENAI_KEY:
        raise RuntimeError('OpenAI not configured')
    url = 'https://api.openai.com/v1/chat/completions'
    payload = {'model':'gpt-4o-mini','messages':[{'role':'user','content':prompt}], 'max_tokens':300}
    headers = {'Authorization': f'Bearer {OPENAI_KEY}', 'Content-Type': 'application/json'}
    r = requests.post(url, json=payload, headers=headers, timeout=12)
    r.raise_for_status()
    return r.json()

@app.route('/ask', methods=['POST'])
def ask():
    prompt = (request.json or {}).get('prompt','')
    if not prompt:
        return jsonify({'error':'no prompt'}), 400
    try:
        return jsonify({'source':'neuroedge','data':call_neuro(prompt)})
    except Exception:
        try:
            return jsonify({'source':'openai','data':call_openai(prompt)})
        except Exception:
            return jsonify({'source':'mock','data':{'message':'fallback','ts': int(time.time())}})

@app.route('/health')
def health():
    return jsonify({'ok':True,'ts':int(time.time())})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT',6000)))
