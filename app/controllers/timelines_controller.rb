class TimelinesController < ApplicationController

  def show
    @users_map = User.all.index_by(&:id)
    @user_project_tasks = {}
  end

  def tasks
    @tasks = {
        success: 1,
        result: [
        {
            id: 293,
            title: "Event 1",
            url: "http://example.com",
            class: "event-important",
            start: Time.now.beginning_of_day.to_i,
            end: (Time.now + 2.days).end_of_day.to_i
			}
		]
	}
    render :json => @tasks
  end
end
