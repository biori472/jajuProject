package member.service;

import java.util.Map;

import member.bean.MemberDTO;

public interface MemberService {
	public MemberDTO login(Map<String, String> map);
	public String checkId(String member_id);
	public void write(MemberDTO memberDTO);
	public void kakao_write(Map<String, String> map);
	public String getId(Map<String, String> map);
	public String getPwd(Map<String, String> map);
	public MemberDTO getMember(String member_id);
	public void modify(MemberDTO memberDTO);
	public String isBlackList(String member_email);
	public void retire(String member_id);
}
