class User < ActiveRecord::Base
  has_many :memberships, class: ProjectUser

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauth_providers => [:google_oauth2]

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)

    hosting_domain = access_token.extra.raw_info.hd rescue ""
    unless hosting_domain == "idyllic-software.com"
      user = User.new()
      user.errors.add(:base, "You are not part of mavericks. Try when you reach that level.")
      return user
    end
    data = access_token.info
    user = User.where(:provider => access_token.provider, :uid => access_token.uid ).first
    if user
      return user
    else
      registered_user = User.where(:email => access_token.info.email).first
      if registered_user
        return registered_user
      else
        user = User.create(name: data["name"],
                           provider:access_token.provider,
                           email: data["email"],
                           uid: access_token.uid ,
                           password: Devise.friendly_token[0,20],
                           username: access_token.info.name,
                           avatar: access_token.info.image
        )
      end
    end
  end
end