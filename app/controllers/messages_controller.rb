class MessagesController < ApplicationController
  # On désactive la vérification CSRF car le formulaire est en HTML statique (public/index.html)
  # et n'a pas accès au token Rails généré côté serveur.
  skip_before_action :verify_authenticity_token

  # On autorise l'accès sans être connecté — n'importe qui peut envoyer un message
  skip_before_action :authenticate_user!

  def create
    # On récupère et nettoie les paramètres envoyés depuis le formulaire
    name    = params[:name].to_s.strip
    email   = params[:email].to_s.strip
    message = params[:message].to_s.strip

    # Validation basique : tous les champs sont obligatoires
    if name.blank? || email.blank? || message.blank?
      render json: { error: "Tous les champs sont requis." }, status: :unprocessable_entity
      return
    end

    # On envoie l'email en arrière-plan via Solid Queue (deliver_later)
    # pour ne pas bloquer la réponse HTTP pendant l'envoi SMTP
    ContactMailer.new_message(name:, email:, message:).deliver_later

    # On renvoie un JSON simple — le formulaire React l'utilise pour afficher la confirmation
    render json: { ok: true }, status: :ok
  end
end
