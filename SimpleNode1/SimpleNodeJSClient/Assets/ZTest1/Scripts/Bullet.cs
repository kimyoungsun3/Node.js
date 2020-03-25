using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace NodeTest
{
	public class Bullet : MonoBehaviour
	{
		Transform trans;
		float speed;
		float damage;
		float moveTotal;
		[SerializeField] float MAX_LIMIT = 10f;
		[SerializeField] LayerMask checkMask;
		Ray ray;
		[SerializeField] ParticleSystem effect;

		private void Start()
		{
			trans = transform;
		}


		public void SetData(float _speed, float _damage)
		{
			speed	= _speed;
			damage	= _damage;
			trans	= transform;
		}

		void Update()
		{
			if(moveTotal > MAX_LIMIT)
			{
				Destroy(gameObject);
				return;
			}

			float _moveDelta = speed * Time.deltaTime;
			moveTotal		+= _moveDelta;
			ray.origin		= trans.position;
			ray.direction	= trans.right;
			RaycastHit _hit;
			if(Physics.Raycast(ray, out _hit, _moveDelta, checkMask, QueryTriggerInteraction.Collide))
			{
				//ParticleSystem _ps = Instantiate(effect, trans.position, Quaternion.identity) as ParticleSystem;
				//Destroy(_ps.gameObject, 1f);
				Player _player = _hit.collider.GetComponent<Player>();
				if (_player)
				{
					_player.SetDamage(damage);
				}
				Destroy(gameObject);
			}
			else
			{
				trans.Translate(_moveDelta * Vector3.right);
			}
		}
	}
}