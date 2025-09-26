import smtplib
import random
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import EmailStr
from Config.Config import setting
from fastapi import HTTPException, status

sender = setting.SENDER_MAIL
pswd = setting.PSWD

# OTP store for multiple users
otp_store = {}   # { email: { "otp": "123456", "expires_at": datetime } }

def sendotp(receivingMail: EmailStr):
    receivingMail = str(receivingMail)  # ✅ Ensure it's plain string

    Subject = "Account Verification OTP"
    otp = str(random.randint(100000, 999999))

    # save OTP and expiry time for this user
    otp_store[receivingMail] = {
        "otp": otp,
        "expires_at": datetime.now() + timedelta(minutes=10)
    }

    # Public logo URL
    logo_url = "https://i.ibb.co/JWyPM9GM/logo-black.png"

    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height:1.6; background-color:#f9f9f9; margin:0; padding:0;">
        <div style="max-width:600px; margin:30px auto; background-color:#ffffff; padding:30px; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
          <div style="text-align:center; margin-bottom:20px;">
            <img src="{logo_url}" alt="PaperTrade.in Logo" width="150">
          </div>
          <h2 style="color:#2E86C1;">PaperTrade.in</h2>
          <p>Dear User,</p>
          <p>Thank you for registering on <strong>PaperTrade.in</strong>!</p>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <div style="display:inline-block; background-color:#E74C3C; color:#ffffff; font-size:32px; padding:15px 30px; border-radius:8px; letter-spacing:5px; margin:20px 0; text-align:center;">
            {otp}
          </div>
          <p>Please use this OTP to complete your registration. This OTP is valid for the next 10 minutes.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
          <div style="font-size:12px; color:#888888; margin-top:30px; text-align:center;">
            Best regards,<br>
            The PaperTrade.in Team
          </div>
        </div>
      </body>
    </html>
    """

    # Create a multipart message and attach the HTML body
    msg = MIMEMultipart()
    msg["Subject"] = Subject
    msg["From"] = sender
    msg["To"] = receivingMail
    msg.attach(MIMEText(html_body, "html"))

    try:
        # Send email via Gmail SMTP
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender, pswd)
        server.sendmail(sender, receivingMail, msg.as_string())
        server.quit()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": f"Failed to send OTP: {str(e)}"}
        )

    print(f"✅ OTP sent successfully to {receivingMail}")  # Debug only


def verify(email: str, user_input: str):
    email = str(email)  # ✅ normalize
    user_data = otp_store.get(email)

    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "No OTP generated for this email"}
        )

    if datetime.now() > user_data["expires_at"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"message": "Token Expired"}
        )

    if user_input == user_data["otp"]:
        del otp_store[email]  # remove after success
        return {"message": "OTP verified successfully", "result": True}
    else:
        return {"message": "Invalid OTP", "result": False}
