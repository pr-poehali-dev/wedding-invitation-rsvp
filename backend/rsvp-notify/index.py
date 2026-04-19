import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    """Отправляет уведомление на почту при подтверждении участия в свадьбе."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    guests = body.get('guests', '1')

    if not name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя обязательно'}, ensure_ascii=False)
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')
    to_email = 'katya.eremina.2002@bk.ru'

    guests_word = 'гость' if guests == '1' else 'гостя'

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #fff; border: 1px solid #f0e0e8; border-radius: 16px;">
      <h2 style="color: #C2185B; font-size: 28px; margin-bottom: 8px; text-align: center;">💍 Новое подтверждение</h2>
      <p style="text-align: center; color: #888; margin-bottom: 24px;">Артём & Екатерина · 12 июня 2026</p>
      <hr style="border: none; border-top: 1px solid #f0e0e8; margin-bottom: 24px;">
      <p style="font-size: 16px; color: #333;"><strong>Гость:</strong> {name}</p>
      <p style="font-size: 16px; color: #333;"><strong>Количество:</strong> {guests} {guests_word}</p>
      <hr style="border: none; border-top: 1px solid #f0e0e8; margin-top: 24px; margin-bottom: 16px;">
      <p style="text-align: center; color: #D4A843; font-size: 14px;">✦ Свадебный сайт Артёма и Екатерины ✦</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'✉️ {name} подтвердил(а) участие в свадьбе'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }