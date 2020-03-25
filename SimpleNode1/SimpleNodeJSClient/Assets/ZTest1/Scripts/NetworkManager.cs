using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;


namespace NodeTest
{
	public enum Protocol
	{
					CONNECT,
					DISCONNECT,
					ERROR,
		PTC_LOGIN, PTS_LOGIN,
					PTS_OTHER,
					PTS_OTHER2,
					PTS_LOGOUT,
		PTC_CHAT, PTS_CHAT,
		PTC_MOVE, PTS_MOVE,
		PTC_JUMP, PTS_JUMP,
		PTC_TELEPORT, PTS_TELEPORT,
		PTC_BLINK, PTS_BLINK,
		PTC_ATTACK, PTS_ATTACK,
		PTC_DISCONNECT, PTS_DISCONNECT
	}

	[RequireComponent(typeof(SocketIOComponent))]
	public class NetworkManager : MonoBehaviour
	{
		[SerializeField] string ip;
		[SerializeField] int port;
		public static NetworkManager ins;
		private SocketIOComponent socket;
		private string sId;
		public Player player;
		[HideInInspector]public Player myPlayer;

		void Awake()
		{
			if (ins != null)
			{
				Destroy(gameObject);
				return;
			}
			ins = this;
			DontDestroyOnLoad(gameObject);
		}

		void Start()
		{
			//event call back 방식으로 구현
			socket = GetComponent<SocketIOComponent>();

			//라이브러리에서 구현된것임...
			socket.On("connect", OnConnect);
			socket.On("disconnect", OnDisconnect);
			socket.On("error", OnError);

			socket.On("PTS_LOGIN", OnLogin);
			socket.On("PTS_LOGOUT", OnLogout);
			socket.On("PTS_OTHER", OnOther);
			socket.On("PTS_OTHER2", OnOther2);
			socket.On("PTS_CHAT", OnChat);
			socket.On("PTS_MOVE", OnMove);
			socket.On("PTS_JUMP", OnJump);
			socket.On("PTS_TELEPORT", OnTeleport);
			socket.On("PTS_BLINK", OnBlink);

			socket.On("PTS_ATTACK", OnAttack);
		}

		public void Connect()
		{
			socket.url = "ws://" + ip + ":" + port + "/socket.io/?EIO=4&transport=websocket";
			Debug.Log(this + " >> " + socket.url);
			socket.Connect();
		}

		public void SendCode(Protocol _type, string _str = null)
		{
			JSONObject _json = new JSONObject();
			//_json.Clear();
			switch (_type)
			{
				case Protocol.PTC_LOGIN:
					{
						Debug.Log("[C -> S] " + _type.ToString());
						_json.AddField("id", "iiiii");
						_json.AddField("pw", "ppppp");

						socket.Emit(_type.ToString(), _json);
					}
					break;
				case Protocol.PTC_CHAT:
					{
						Debug.Log("[C -> S] " + _type.ToString());
						_json.AddField("id", sId);
						_json.AddField("msg", _str);

						socket.Emit(_type.ToString(), _json);
					}
					break;
				case Protocol.PTC_MOVE:
					{
						//Debug.Log("[C -> S] " + _type.ToString());
						Transform _t = myPlayer.transform;

						_json.AddField("id", myPlayer.playerData.id);
						_json.AddField("pos", JSONTemplates.FromVector3(_t.position));
						_json.AddField("rot", JSONTemplates.FromQuaternion(_t.rotation));
						socket.Emit(_type.ToString(), _json);
					}
					break;
				case Protocol.PTC_ATTACK:
					{
						Debug.Log("[C -> S] " + _type.ToString());
						Transform _t = myPlayer.spawnPoint.transform;

						_json.AddField("id", myPlayer.playerData.id);
						_json.AddField("attack", (short)myPlayer.attackKind);
						_json.AddField("pos", JSONTemplates.FromVector3(_t.position));
						_json.AddField("rot", JSONTemplates.FromQuaternion(_t.rotation));
						socket.Emit(_type.ToString(), _json);
					}
					break;
				case Protocol.PTC_BLINK:
					{
						Debug.Log("[C -> S] " + _type.ToString());
						Transform _t = myPlayer.transform;

						_json.AddField("id", myPlayer.playerData.id);
						_json.AddField("pos", JSONTemplates.FromVector3(_t.position));
						_json.AddField("rot", JSONTemplates.FromQuaternion(_t.rotation));
						socket.Emit(_type.ToString(), _json);
					}
					break;
				case Protocol.PTC_DISCONNECT:
					{
						//Debug.Log("[C -> S] " + _type.ToString());
						_json.AddField("id", sId);

						socket.Emit(_type.ToString(), _json);
					}
					break;
			}
		}

		//private void OnApplicationQuit()
		//{
		//	SendCode(Protocol.PTC_DISCONNECT, "");
		//}

		//-----------------------------------
		void ParseCode(Protocol _type, SocketIOEvent _e)
		{
			switch (_type)
			{
				//case Protocol.CONNECT:
				//	Debug.Log("connect");
				//	break;
				//case Protocol.DISCONNECT:
				//	Debug.Log("disconnect");
				//	break;
				//case Protocol.ERROR:
				//	Debug.Log("error");
				//	break;
				case Protocol.PTS_LOGIN:
					{
						Debug.Log("[C <- S] " + _type.ToString());

						Player _player = Instantiate(player, Vector3.zero, Quaternion.identity) as Player;
						_player.SetData(_e, true);
						myPlayer = _player;
					}
					break;
				case Protocol.PTS_OTHER:
				case Protocol.PTS_OTHER2:
					{
						Debug.Log("[C <- S] " + _type.ToString());
						Player _player = Instantiate(player, Vector3.zero, Quaternion.identity) as Player;
						_player.SetData(_e, false);
					}
					break;
				case Protocol.PTS_LOGOUT:
					{
						Debug.Log("[C <- S] " + _type.ToString());
						Player.DestroyPlayer(_e);
					}
					break;
				case Protocol.PTS_CHAT:
					{
						Debug.Log("[C <- S] " + _type.ToString());
						string msg = _e.data.GetField("msg").str;
					}
					break;
				case Protocol.PTS_MOVE:
					{
						//Debug.Log("[C <- S] " + _type.ToString());
						string _id = _e.data.GetField("id").str;
						if (Player.dicPlayer.ContainsKey(_id))
						{
							//Debug.Log(" >> move");
							Player.dicPlayer[_id].NetSetPosition(
								JSONTemplates.ToVector3(_e.data.GetField("pos")),
								JSONTemplates.ToQuaternion(_e.data.GetField("rot"))
							);
						}
						//string x = _e.data.GetField("x").str;
					}
					break;
				case Protocol.PTS_JUMP:
					Debug.Log("[C <- S] " + _type.ToString());
					break;
				case Protocol.PTS_TELEPORT:
					Debug.Log("[C <- S] " + _type.ToString());
					break;
				case Protocol.PTS_ATTACK:
					{
						Debug.Log("[C <- S] " + _type.ToString());
						string _id = _e.data.GetField("id").str;
						if (Player.dicPlayer.ContainsKey(_id))
						{
							Debug.Log(" >> attack" + (int)_e.data.GetField("attack").n);

							int _kind = (int)_e.data.GetField("attack").n;
							Player.dicPlayer[_id].NetSetAttackNormal(
								(eAttackKind)_kind,
								JSONTemplates.ToVector3(_e.data.GetField("pos")),
								JSONTemplates.ToQuaternion(_e.data.GetField("rot"))
							);
						}
						//string x = _e.data.GetField("x").str;
					}
					break;

				case Protocol.PTS_BLINK:
					{
						Debug.Log("[C <- S] " + _type.ToString());
						string _id = _e.data.GetField("id").str;
						if (Player.dicPlayer.ContainsKey(_id))
						{
							Debug.Log(" >> blink1");
							Player.dicPlayer[_id].NetSetBlink(
								JSONTemplates.ToVector3(_e.data.GetField("pos")),
								JSONTemplates.ToQuaternion(_e.data.GetField("rot"))
							);
						}
						break;
					}
				case Protocol.PTS_DISCONNECT:
					{
						Player.DestroyPlayer(_e);
					}
					break;
				default:
					Debug.Log("지정되지 않는 프로토콜...");
					break;
			}
		}

		private void Update()
		{
			//Debug.Log("---- Update -----");
			if (Input.GetKeyDown(KeyCode.Alpha1))
				SendCode(Protocol.PTC_LOGIN);
			else if (Input.GetKeyDown(KeyCode.Alpha2))
				SendCode(Protocol.PTC_CHAT);

		}

		private void OnConnect(SocketIOEvent _e){	SendCode(Protocol.PTC_LOGIN);	}
		private void OnDisconnect(SocketIOEvent _e)	{
			//ParseCode(Protocol.DISCONNECT, _e);
			Debug.Log("OnDisconnect");
		}

		private void OnError(SocketIOEvent _e)
		{
			//ParseCode(Protocol.ERROR, _e);
			Debug.Log("OnError");
		}

		void OnLogin(SocketIOEvent _e){	ParseCode(Protocol.PTS_LOGIN, _e);	}
		void OnLogout(SocketIOEvent _e) { ParseCode(Protocol.PTS_LOGOUT, _e); }
		void OnOther(SocketIOEvent _e) { ParseCode(Protocol.PTS_OTHER, _e); }
		void OnOther2(SocketIOEvent _e) { ParseCode(Protocol.PTS_OTHER2, _e); }
		void OnChat(SocketIOEvent _e){	ParseCode(Protocol.PTS_CHAT, _e);	}
		void OnMove(SocketIOEvent _e) { ParseCode(Protocol.PTS_MOVE, _e); }
		void OnBlink(SocketIOEvent _e) { ParseCode(Protocol.PTS_BLINK, _e); }
		void OnJump(SocketIOEvent _e) { ParseCode(Protocol.PTS_JUMP, _e); }
		void OnTeleport(SocketIOEvent _e) { ParseCode(Protocol.PTS_TELEPORT, _e); }
		void OnAttack(SocketIOEvent _e)	{ParseCode(Protocol.PTS_ATTACK, _e);		}
	}
}
