package member.bean;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MemberDTO {
	private String member_id, member_pwd, member_name, member_email, member_telephone;
	private String member_sido, member_sigungu, member_address, member_detailAddr, member_gender;
	private double member_manner;
	private int member_warning;
	private String member_state, member_image;
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="yyyy.MM.dd")
	private Date member_date;
}
