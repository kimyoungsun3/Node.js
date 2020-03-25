using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Threading;
using SocketIO;

public enum Protocol
{
					CONNECT,
					DISCONNECT,
	PTC_LOGIN,		PTS_LOGIN,
	PTC_CHAT,		PTS_CHAT,
	PTC_MOVE,		PTS_MOVE,
	PTC_ATTACK,		PTS_ATTACK,
	PTC_DISCONNECT, PTS_DISCONNECT
}
public class NetClientMgr : MonoBehaviour
{
    private SocketIOComponent socket;
    private string sId;
    public static NetClientMgr instance = null;
    public ChatUI chatUI;

    void Awake()
    {
        if (instance != null) {
            Destroy(gameObject);
			return;
		}
		instance = this;
		DontDestroyOnLoad(gameObject);
    }

	void Start()
    {
        socket = GetComponent<SocketIOComponent>();
		//socket.On("open", OnOpen);
		socket.On("PTS_LOGIN", OnLogin);
		socket.On("PTS_CHAT", OnChat);
		socket.On("PTS_MOVE", OnMove);
		socket.On("PTS_ATTACK", OnAttack);

		socket.On("connect", OnConnect);
		socket.On("disconnect", OnDisconnect);

		socket.On("error", OnError);
	}

	JSONObject tmpJson = new JSONObject();
	void SendCode(Protocol _type, string _str = null)
	{
		tmpJson.Clear();
		switch (_type) {
			case Protocol.PTC_CHAT:
				Debug.Log("[C -> S] " + _type.ToString());
				tmpJson.AddField("id", sId);
				tmpJson.AddField("msg", _str);

				socket.Emit(_type.ToString(), tmpJson);
				break;
			case Protocol.PTC_MOVE:
				Debug.Log("[C -> S] " + _type.ToString());

				socket.Emit(_type.ToString(), tmpJson);
				break;
			case Protocol.PTC_DISCONNECT:
				Debug.Log("[C -> S] " + _type.ToString());
				tmpJson.AddField("id", sId);
				//Debug.Log("[PTC_DISCONNECT]" + _json.ToString());

				socket.Emit(_type.ToString(), tmpJson);
				break;

		}
	}

	public void sendMessage(string _msg)
	{
		SendCode(Protocol.PTC_CHAT, _msg);
	}

	private void OnApplicationQuit()
	{
		SendCode(Protocol.PTC_DISCONNECT, "");
	}

	//-----------------------------------
	void ParseCode(Protocol _type, SocketIOEvent _e)
	{
		switch (_type)
		{
			case Protocol.CONNECT:
				Debug.Log("[C <- S] connect");
				break;
			case Protocol.DISCONNECT:
				Debug.Log("[C <- S] disconnect");
				break;
			case Protocol.PTS_LOGIN:
				Debug.Log("[C <- S] PTS_LOGIN");
				sId = _e.data.GetField("id").str;
				Debug.Log("@sId=" + sId);
				break;
			case Protocol.PTS_CHAT:
				Debug.Log("[C <- S] PTS_CHAT");
				string msg = _e.data.GetField("msg").str;
				Debug.Log(" >> " + msg);

				chatUI.createMessage(msg);
				break;
			case Protocol.PTS_MOVE:
				break;
			case Protocol.PTS_DISCONNECT:
				break;
			default:
				Debug.Log("지정되지 않는 프로토콜...");
				break;
		}
	}
	void OnLogin(SocketIOEvent _e)
	{
		ParseCode(Protocol.PTS_LOGIN, _e);
	}

    void OnChat(SocketIOEvent _e) {
		ParseCode(Protocol.PTS_CHAT, _e);
	}

	void OnMove(SocketIOEvent _e)
	{
		ParseCode(Protocol.PTS_MOVE, _e);
	}

	void OnAttack(SocketIOEvent _e)
	{
		ParseCode(Protocol.PTS_ATTACK, _e);
	}

	private void OnConnect(SocketIOEvent _e)
	{
		ParseCode(Protocol.CONNECT, _e);
	}

	void OnDisconnect(SocketIOEvent _e)
	{
		ParseCode(Protocol.DISCONNECT, _e);
	}

	void OnError(SocketIOEvent e) {
        Debug.Log("[error]");
    }


  

    public void Connect(string ip, string port) {
		//
		Debug.Log(ip + ":" + port);
        socket.url = "ws://" 
			+ ip + ":" 
			+ port 
			+ "/socket.io/?EIO=4&transport=websocket";
        socket.Connect();
    }

    public void Close() {
        socket.Close();
    }

}
