function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'https://developers.kakao.com/tool/demo/oauth',
      state: 'sendfriend_text',
      scope: 'friends,talk_message', // 앱 동의 항목 설정 및 사용자 동의 필요
    });
  }
  
  function kakaoSendMsg(msg){
    if (!confirm('메시지를 전송하시겠습니까?')) { return; }
  
    Kakao.Picker.selectFriends({
      showMyProfile: false,
      maxPickableCount: 10,
      minPickableCount: 1,
    })
      .then(function(res) {
        var uuids = res.users.map(function(e) { return e.uuid; });
  
        return Kakao.API.request({
          url: '/v1/api/talk/friends/message/default/send',
          data: {
            receiver_uuids: uuids,
            template_object: {
              object_type: 'text',
              text: msg
              
            },
          },
        });
      })
  }