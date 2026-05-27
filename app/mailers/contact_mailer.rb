class ContactMailer < ApplicationMailer
  def new_message(name:, email:, message:)
    @name    = name
    @email   = email
    @message = message

    mail(
      to:        "pardoue.xavier@gmail.com",
      reply_to:  email,
      subject:   "Portfolio — Message de #{name}"
    )
  end
end
